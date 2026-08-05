import { useState, useRef, type MouseEvent } from "react";
import {
  Box,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Fade,
  Typography,
  CircularProgress,
  Collapse,
  Alert,
} from "@mui/material";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";
import ShortTextRoundedIcon from "@mui/icons-material/ShortTextRounded";
import WorkspacePremiumRoundedIcon from "@mui/icons-material/WorkspacePremiumRounded";
import NotesRoundedIcon from "@mui/icons-material/NotesRounded";
import Diversity3RoundedIcon from "@mui/icons-material/Diversity3Rounded";
import {
  type Control,
  type UseFormSetValue,
  type UseFormWatch,
  type FieldValues,
  type Path,
} from "react-hook-form";
import AppTextField from "../../../../components/common/AppTextField";

interface ToneOption {
  label: string;
  tone: string;
  icon: React.ReactNode;
}

const DEFAULT_TONES: ToneOption[] = [
  {
    label: "Make it more professional",
    tone: "professional",
    icon: <WorkspacePremiumRoundedIcon fontSize="small" />,
  },
  {
    label: "Make it more concise",
    tone: "concise",
    icon: <ShortTextRoundedIcon fontSize="small" />,
  },
  {
    label: "Add more detail",
    tone: "detailed",
    icon: <NotesRoundedIcon fontSize="small" />,
  },
  {
    label: "Make it friendlier",
    tone: "friendly",
    icon: <Diversity3RoundedIcon fontSize="small" />,
  },
];

// Types that match RTK Query mutation hooks
interface MutationState {
  isLoading: boolean;
  error?: any;
  reset?: () => void;
}

interface MutationTriggerResult {
  unwrap: () => Promise<any>;
}

type MutationHook = () => readonly [
  (arg: any) => MutationTriggerResult,
  MutationState,
];

export interface AiAssistFieldProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  setValue: UseFormSetValue<T>;
  watch: UseFormWatch<T>;
  label: string;
  rows?: number;
  multiline?: boolean;
  placeholder?: string;
  /** Mutation hook for generation (e.g., useGenerateSummaryMutation) */
  generateMutationHook: MutationHook;
  /** Optional mutation hook for enhancement (e.g., useEnhanceDescriptionMutation) */
  enhanceMutationHook?: MutationHook;
  /** Transformer for generation payload – receives params and returns the body for the mutation */
  generatePayload?: (params: {
    action: string;
    fieldType: string;
    context?: Record<string, unknown>;
  }) => any;
  /** Transformer for enhancement payload – receives params and returns the body for the mutation */
  enhancePayload?: (params: {
    currentText: string;
    tone?: string;
    fieldType: string;
    context?: Record<string, unknown>;
  }) => any;
  /** Override the default tone/enhance options */
  toneOptions?: ToneOption[];
  /** Label shown for the "generate from scratch" menu item */
  generateLabel?: string;
  responseTransformer?: (response: any) => string;
}

function AiAssistField<T extends FieldValues>({
  name,
  control,
  setValue,
  watch,
  label,
  rows = 4,
  multiline = true,
  placeholder,
  generateMutationHook,
  enhanceMutationHook,
  generatePayload = (params) => ({ userData: params }), // default matches generateSummary
  enhancePayload = (params) => ({ text: params.currentText }), // default matches enhanceDescription
  toneOptions = DEFAULT_TONES,
  generateLabel = "Generate for me",
  responseTransformer,
}: AiAssistFieldProps<T>) {
  // Call the hooks – they return readonly tuples
  const [generateMutate, generateState] = generateMutationHook();
  const [enhanceMutate, enhanceState] = enhanceMutationHook
    ? enhanceMutationHook()
    : [null, { isLoading: false, error: null } as MutationState];

  const loading = generateState.isLoading || enhanceState.isLoading;
  const error = generateState.error || enhanceState.error;

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [justGenerated, setJustGenerated] = useState(false);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined,
  );

  const currentText = watch(name) as string | undefined;
  const menuOpen = Boolean(anchorEl);

  const openMenu = (e: MouseEvent<HTMLElement>) => setAnchorEl(e.currentTarget);
  const closeMenu = () => setAnchorEl(null);

  const clearError = () => {
    if (generateState.reset) generateState.reset();
    if (enhanceState.reset) enhanceState.reset();
  };

  const runAi = async (action: "generate" | "enhance", tone?: string) => {
    closeMenu();
    clearError();

    let result: any;
    try {
      if (action === "generate") {
        const payload = generatePayload({
          action,
          fieldType: label,
          context: {},
        });
        result = await generateMutate(payload).unwrap();
      } else {
        if (!enhanceMutate) {
          throw new Error("Enhancement mutation is not available");
        }

        const payload = enhancePayload({
          currentText: currentText || "",
          tone,
          fieldType: label,
          context: {},
        });
        result = await enhanceMutate(payload).unwrap();
      }

      // Extract text using the transformer if provided, otherwise fallback
      let extractedText: string;
      if (responseTransformer) {
        extractedText = responseTransformer(result);
      } else {
        // Keep existing fallback for backward compatibility
        const text: unknown =
          result?.data?.text ??
          result?.data ??
          result?.text ??
          result?.summary ??
          result?.result;
        extractedText = typeof text === "string" ? text : "";
      }

      if (!extractedText?.trim()) {
        throw new Error("AI response was empty or in an unexpected format");
      }

      setValue(name, extractedText as any, {
        shouldDirty: true,
        shouldValidate: true,
        shouldTouch: true,
      });
      setJustGenerated(true);
      clearTimeout(hideTimer.current);
      hideTimer.current = setTimeout(() => setJustGenerated(false), 2500);
    } catch (err: any) {
      // Error is already stored in the mutation state; we don't need to do anything else
      console.error(err);
    }
  };

  // Helper to extract a readable error message from RTK Query error objects
  const getErrorMessage = (err: any): string => {
    if (!err) return "Something went wrong";
    if (typeof err === "string") return err;
    if (err.data?.message) return err.data.message;
    if (err.message) return err.message;
    return "Something went wrong";
  };

  return (
    <Box>
      <Box
        sx={{
          position: "relative",
          borderRadius: 2,
          transition: "box-shadow 200ms ease",
          ...(loading && {
            boxShadow: (theme) => `0 0 0 2px ${theme.palette.primary.main}33`,
            "@keyframes aiPulse": {
              "0%": {
                boxShadow: (theme: any) =>
                  `0 0 0 2px ${theme.palette.primary.main}22`,
              },
              "50%": {
                boxShadow: (theme: any) =>
                  `0 0 0 4px ${theme.palette.primary.main}44`,
              },
              "100%": {
                boxShadow: (theme: any) =>
                  `0 0 0 2px ${theme.palette.primary.main}22`,
              },
            },
            animation: "aiPulse 1.6s ease-in-out infinite",
          }),
        }}
      >
        <AppTextField
          name={name}
          control={control}
          label={label}
          multiline={multiline}
          rows={rows}
          placeholder={placeholder}
          disabled={loading}
        />

        <Tooltip
          title={currentText?.trim() ? "AI actions" : "Generate with AI"}
        >
          <span style={{ position: "absolute", top: 8, right: 8 }}>
            <IconButton
              size="small"
              onClick={openMenu}
              disabled={loading}
              sx={{
                background: (theme) =>
                  `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                color: "common.white",
                boxShadow: 2,
                "&:hover": {
                  background: (theme) =>
                    `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.secondary.dark})`,
                },
                "&.Mui-disabled": {
                  background: (theme) =>
                    theme.palette.action.disabledBackground,
                },
              }}
            >
              {loading ? (
                <CircularProgress size={16} color="inherit" />
              ) : (
                <AutoAwesomeRoundedIcon fontSize="small" />
              )}
            </IconButton>
          </span>
        </Tooltip>

        <Menu
          anchorEl={anchorEl}
          open={menuOpen}
          onClose={closeMenu}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          <MenuItem onClick={() => runAi("generate")}>
            <ListItemIcon>
              <AutoAwesomeRoundedIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>{generateLabel}</ListItemText>
          </MenuItem>
          {currentText?.trim() &&
            toneOptions.map((opt) => (
              <MenuItem
                key={opt.tone}
                onClick={() => runAi("enhance", opt.tone)}
              >
                <ListItemIcon>{opt.icon}</ListItemIcon>
                <ListItemText>{opt.label}</ListItemText>
              </MenuItem>
            ))}
        </Menu>
      </Box>

      <Fade
        in={justGenerated}
        timeout={{ enter: 200, exit: 400 }}
        unmountOnExit
      >
        <Typography
          variant="caption"
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 0.5,
            mt: 0.5,
            color: "primary.main",
            fontWeight: 500,
          }}
        >
          <AutoAwesomeRoundedIcon sx={{ fontSize: 14 }} /> Generated with AI —
          feel free to edit
        </Typography>
      </Fade>

      <Collapse in={Boolean(error)} unmountOnExit>
        <Alert severity="error" sx={{ mt: 1 }} onClose={clearError}>
          {getErrorMessage(error)}
        </Alert>
      </Collapse>
    </Box>
  );
}

export default AiAssistField;
