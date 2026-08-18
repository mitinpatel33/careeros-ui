import { useState } from "react";
import {
  Box,
  Button,
  Drawer,
  IconButton,
  MenuItem,
  Paper,
  Slider,
  Stack,
  Switch,
  Tab,
  Tabs,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import RestartAltRoundedIcon from "@mui/icons-material/RestartAltRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import { HexColorPicker } from "react-colorful";
import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  Bold,
  Check,
  Circle,
  Italic,
  Minus,
  Square,
  Underline,
} from "lucide-react";

import type {
  BulletStyle,
  HeaderAlign,
  ResumeDesignSettings,
  ResumeFontFamily,
  ResumeSpacing,
  SectionTitleStyle,
  TextAlignStyle,
} from "../../../../types/candidate/resume.types";
import { defaultResumeSettings } from "../../../../types/candidate/resume.types";

type Props = {
  open: boolean;
  onClose: () => void;
  settings: ResumeDesignSettings;
  onChange: (settings: ResumeDesignSettings) => void;
};

const themeColors = ["#1976d2", "#111827", "#16a34a", "#7c3aed", "#ea580c", "#e11d48"];

const sectionLabels: Record<keyof ResumeDesignSettings["sectionColors"], string> = {
  summary: "Summary",
  skills: "Skills",
  experience: "Experience",
  education: "Education",
  projects: "Projects",
  certifications: "Certifications",
  achievements: "Achievements",
  languages: "Languages",
  references: "References",
};

const ResumeSettingsDrawer = ({ open, onClose, settings, onChange }: Props) => {
  const [tab, setTab] = useState(0);

  const update = <K extends keyof ResumeDesignSettings>(
    key: K,
    value: ResumeDesignSettings[K],
  ) => onChange({ ...settings, [key]: value });

  const updateHeader = <K extends keyof ResumeDesignSettings["header"]>(
    key: K,
    value: ResumeDesignSettings["header"][K],
  ) => {
    onChange({ ...settings, header: { ...settings.header, [key]: value } });
  };

  const updateContent = <K extends keyof ResumeDesignSettings["content"]>(
    key: K,
    value: ResumeDesignSettings["content"][K],
  ) => {
    onChange({ ...settings, content: { ...settings.content, [key]: value } });
  };

  const updateAllColors = (color: string) => {
    const sectionColors = Object.keys(settings.sectionColors).reduce(
      (acc, key) => {
        acc[key as keyof ResumeDesignSettings["sectionColors"]] = color;
        return acc;
      },
      {} as ResumeDesignSettings["sectionColors"],
    );

    onChange({
      ...settings,
      themeColor: color,
      accentColor: color,
      sectionColors,
      content: { ...settings.content, bulletColor: color },
    });
  };

  const updateSectionColor = (
    key: keyof ResumeDesignSettings["sectionColors"],
    color: string,
  ) => {
    onChange({
      ...settings,
      sectionColors: {
        ...settings.sectionColors,
        [key]: color,
      },
    });
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      slotProps={{
        paper: {
          sx: {
            width: { xs: "100%", sm: 460, md: 540 },
            bgcolor: "#f8fafc",
            overflow: "hidden",
          },
        },
      }}
    >
      <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
        <Box sx={{ p: { xs: 2, sm: 2.5 } }}>
          <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "flex-start" }}>
            <Box>
              <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
                <SettingsRoundedIcon color="primary" />
                <Typography variant="h5" sx={{ fontWeight: 950 }}>
                  Resume Settings
                </Typography>
              </Stack>

              <Typography color="text.secondary" sx={{ fontSize: 13 }}>
                Customize theme, typography, header, bullets and sections.
              </Typography>
            </Box>

            <IconButton
              onClick={onClose}
              sx={{
                bgcolor: "#fff",
                border: "1px solid #e5e7eb",
                "&:hover": { bgcolor: "#fee2e2", color: "#dc2626" },
              }}
            >
              <CloseRoundedIcon />
            </IconButton>
          </Stack>
        </Box>

        <Tabs
          value={tab}
          onChange={(_, value) => setTab(value)}
          variant="scrollable"
          scrollButtons="auto"
          sx={{
            px: 2,
            borderBottom: "1px solid #e5e7eb",
            bgcolor: "#fff",
            "& .MuiTab-root": { fontWeight: 900, textTransform: "none" },
          }}
        >
          <Tab label="Theme" />
          <Tab label="Typography" />
          <Tab label="Layout" />
          <Tab label="Header" />
          <Tab label="Content" />
          <Tab label="Sections" />
        </Tabs>

        <Box
          sx={{
            flex: 1,
            overflowY: "auto",
            px: { xs: 2, sm: 2.5 },
            py: 2,
            "&::-webkit-scrollbar": { width: 6 },
            "&::-webkit-scrollbar-thumb": {
              bgcolor: "#cbd5e1",
              borderRadius: 10,
            },
          }}
        >
          {tab === 0 && (
            <>
              <SettingBlock title="Global Theme Color">
                <Stack direction="row" spacing={1.2} sx={{ flexWrap: "wrap", mb: 2 }}>
                  {themeColors.map((color) => {
                    const active = settings.themeColor === color;

                    return (
                      <Box
                        key={color}
                        onClick={() => updateAllColors(color)}
                        sx={{
                          width: 38,
                          height: 38,
                          borderRadius: "50%",
                          bgcolor: color,
                          cursor: "pointer",
                          border: active ? "4px solid #bfdbfe" : "3px solid #fff",
                          boxShadow: active
                            ? "0 0 0 2px #2563eb"
                            : "0 5px 16px rgba(15,23,42,0.18)",
                        }}
                      />
                    );
                  })}
                </Stack>

                <ColorPickerField
                  label="Custom Theme Color"
                  value={settings.themeColor}
                  onChange={updateAllColors}
                />

                <ColorPickerField
                  label="Resume Background"
                  value={settings.backgroundColor}
                  onChange={(value) => update("backgroundColor", value)}
                />

                <ColorPickerField
                  label="Paper Color"
                  value={settings.paperColor}
                  onChange={(value) => update("paperColor", value)}
                />
              </SettingBlock>
            </>
          )}

          {tab === 1 && (
            <SettingBlock title="Typography">
              <Stack spacing={2}>
                <TextField
                  select
                  size="small"
                  label="Font Family"
                  value={settings.fontFamily}
                  onChange={(e) =>
                    update("fontFamily", e.target.value as ResumeFontFamily)
                  }
                >
                  {["Inter", "Roboto", "Poppins", "Arial", "Montserrat", "Lato"].map((item) => (
                    <MenuItem key={item} value={item}>
                      {item}
                    </MenuItem>
                  ))}
                </TextField>

                <SliderSetting
                  label="Body Font Size"
                  value={settings.fontSize}
                  min={9}
                  max={18}
                  onChange={(value) => update("fontSize", value)}
                />

                <SliderSetting
                  label="Heading Size"
                  value={settings.headingSize}
                  min={18}
                  max={40}
                  onChange={(value) => update("headingSize", value)}
                />

                <SliderSetting
                  label="Line Height"
                  value={settings.lineHeight}
                  min={1}
                  max={2}
                  step={0.05}
                  onChange={(value) => update("lineHeight", value)}
                />

                <SliderSetting
                  label="Letter Spacing"
                  value={settings.letterSpacing}
                  min={0}
                  max={2}
                  step={0.1}
                  onChange={(value) => update("letterSpacing", value)}
                />
              </Stack>
            </SettingBlock>
          )}

          {tab === 2 && (
            <SettingBlock title="Layout">
              <Stack spacing={2}>
                <TextField
                  select
                  size="small"
                  label="Spacing"
                  value={settings.spacing}
                  onChange={(e) => update("spacing", e.target.value as ResumeSpacing)}
                >
                  {["compact", "normal", "comfortable"].map((item) => (
                    <MenuItem key={item} value={item}>
                      {item}
                    </MenuItem>
                  ))}
                </TextField>

                <SliderSetting
                  label="Section Gap"
                  value={settings.sectionGap}
                  min={1}
                  max={5}
                  step={0.2}
                  onChange={(value) => update("sectionGap", value)}
                />

                <SliderSetting
                  label="Page Padding"
                  value={settings.pagePadding}
                  min={2}
                  max={6}
                  step={0.5}
                  onChange={(value) => update("pagePadding", value)}
                />

                <SliderSetting
                  label="Border Radius"
                  value={settings.borderRadius}
                  min={0}
                  max={30}
                  onChange={(value) => update("borderRadius", value)}
                />

                <TextField
                  select
                  size="small"
                  label="Section Title Style"
                  value={settings.sectionTitleStyle}
                  onChange={(e) =>
                    update("sectionTitleStyle", e.target.value as SectionTitleStyle)
                  }
                >
                  {["simple", "line", "pill", "uppercase", "filled"].map((item) => (
                    <MenuItem key={item} value={item}>
                      {item}
                    </MenuItem>
                  ))}
                </TextField>
              </Stack>
            </SettingBlock>
          )}

          {tab === 3 && (
            <SettingBlock title="Header Settings">
              <Stack spacing={2}>
                <Typography sx={{ fontWeight: 900, fontSize: 13 }}>
                  Header Alignment
                </Typography>

                <ToggleButtonGroup
                  exclusive
                  fullWidth
                  value={settings.headerAlign}
                  onChange={(_, value: HeaderAlign | null) => {
                    if (value) update("headerAlign", value);
                  }}
                >
                  <ToggleButton value="left">
                    <AlignLeft size={18} />
                  </ToggleButton>
                  <ToggleButton value="center">
                    <AlignCenter size={18} />
                  </ToggleButton>
                  <ToggleButton value="right">
                    <AlignRight size={18} />
                  </ToggleButton>
                </ToggleButtonGroup>

                <SwitchRow
                  label="Bold Name"
                  checked={settings.header.nameBold}
                  onChange={(value) => updateHeader("nameBold", value)}
                />
                <SwitchRow
                  label="Italic Name"
                  checked={settings.header.nameItalic}
                  onChange={(value) => updateHeader("nameItalic", value)}
                />
                <SwitchRow
                  label="Underline Name"
                  checked={settings.header.nameUnderline}
                  onChange={(value) => updateHeader("nameUnderline", value)}
                />
                <SwitchRow
                  label="Uppercase Name"
                  checked={settings.header.uppercaseName}
                  onChange={(value) => updateHeader("uppercaseName", value)}
                />
                <SwitchRow
                  label="Bold Job Title"
                  checked={settings.header.jobTitleBold}
                  onChange={(value) => updateHeader("jobTitleBold", value)}
                />
                <SwitchRow
                  label="Show Header Divider"
                  checked={settings.header.showDivider}
                  onChange={(value) => updateHeader("showDivider", value)}
                />
                <SwitchRow
                  label="Show Contact Icons"
                  checked={settings.header.showContactIcons}
                  onChange={(value) => updateHeader("showContactIcons", value)}
                />
              </Stack>
            </SettingBlock>
          )}

          {tab === 4 && (
            <>
              <SettingBlock title="Content Style">
                <Stack spacing={2}>
                  <Typography sx={{ fontWeight: 900, fontSize: 13 }}>
                    Bullet Style
                  </Typography>

                  <ToggleButtonGroup
                    exclusive
                    fullWidth
                    value={settings.content.bulletStyle}
                    onChange={(_, value: BulletStyle | null) => {
                      if (value) updateContent("bulletStyle", value);
                    }}
                  >
                    <ToggleButton value="dot">
                      <Circle size={16} />
                    </ToggleButton>
                    <ToggleButton value="square">
                      <Square size={16} />
                    </ToggleButton>
                    <ToggleButton value="dash">
                      <Minus size={16} />
                    </ToggleButton>
                    <ToggleButton value="arrow">→</ToggleButton>
                    <ToggleButton value="check">
                      <Check size={16} />
                    </ToggleButton>
                    <ToggleButton value="none">None</ToggleButton>
                  </ToggleButtonGroup>

                  <ColorPickerField
                    label="Bullet Color"
                    value={settings.content.bulletColor}
                    onChange={(value) => updateContent("bulletColor", value)}
                  />

                  <Typography sx={{ fontWeight: 900, fontSize: 13 }}>
                    Description Alignment
                  </Typography>

                  <ToggleButtonGroup
                    exclusive
                    fullWidth
                    value={settings.content.textAlign}
                    onChange={(_, value: TextAlignStyle | null) => {
                      if (value) updateContent("textAlign", value);
                    }}
                  >
                    <ToggleButton value="left">
                      <AlignLeft size={18} />
                    </ToggleButton>
                    <ToggleButton value="center">
                      <AlignCenter size={18} />
                    </ToggleButton>
                    <ToggleButton value="right">
                      <AlignRight size={18} />
                    </ToggleButton>
                    <ToggleButton value="justify">
                      <AlignJustify size={18} />
                    </ToggleButton>
                  </ToggleButtonGroup>

                  <SwitchRow
                    label="Description Bold"
                    checked={settings.content.descriptionBold}
                    onChange={(value) => updateContent("descriptionBold", value)}
                    icon={<Bold size={18} />}
                  />
                  <SwitchRow
                    label="Description Italic"
                    checked={settings.content.descriptionItalic}
                    onChange={(value) => updateContent("descriptionItalic", value)}
                    icon={<Italic size={18} />}
                  />
                  <SwitchRow
                    label="Description Underline"
                    checked={settings.content.descriptionUnderline}
                    onChange={(value) => updateContent("descriptionUnderline", value)}
                    icon={<Underline size={18} />}
                  />
                  <SwitchRow
                    label="Show Timeline"
                    checked={settings.content.showTimeline}
                    onChange={(value) => updateContent("showTimeline", value)}
                  />

                  <TextField
                    select
                    size="small"
                    label="Skill Chip Style"
                    value={settings.content.chipStyle}
                    onChange={(e) =>
                      updateContent(
                        "chipStyle",
                        e.target.value as ResumeDesignSettings["content"]["chipStyle"],
                      )
                    }
                  >
                    {["soft", "filled", "outlined"].map((item) => (
                      <MenuItem key={item} value={item}>
                        {item}
                      </MenuItem>
                    ))}
                  </TextField>
                </Stack>
              </SettingBlock>
            </>
          )}

          {tab === 5 && (
            <SettingBlock title="Section Wise Colors">
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                  gap: 1.2,
                }}
              >
                {Object.entries(settings.sectionColors).map(([key, value]) => (
                  <Paper
                    key={key}
                    sx={{
                      p: 1.2,
                      borderRadius: 3,
                      border: "1px solid #e5e7eb",
                      boxShadow: "none",
                    }}
                  >
                    <Stack direction="row" sx={{ alignItems: "center", justifyContent: "space-between" }}>
                      <Typography sx={{ fontWeight: 800, fontSize: 13 }}>
                        {sectionLabels[key as keyof ResumeDesignSettings["sectionColors"]]}
                      </Typography>

                      <input
                        type="color"
                        value={value}
                        onChange={(e) =>
                          updateSectionColor(
                            key as keyof ResumeDesignSettings["sectionColors"],
                            e.target.value,
                          )
                        }
                        style={{
                          width: 34,
                          height: 28,
                          border: "none",
                          background: "transparent",
                          cursor: "pointer",
                        }}
                      />
                    </Stack>
                  </Paper>
                ))}
              </Box>
            </SettingBlock>
          )}
        </Box>

        <Box sx={{ p: 2, borderTop: "1px solid #e5e7eb", bgcolor: "#fff" }}>
          <Stack direction="row" spacing={1.2}>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<RestartAltRoundedIcon />}
              onClick={() => onChange(defaultResumeSettings)}
              sx={{ borderRadius: 3, fontWeight: 900 }}
            >
              Reset
            </Button>

            <Button
              fullWidth
              variant="contained"
              onClick={onClose}
              sx={{ borderRadius: 3, fontWeight: 900 }}
            >
              Apply
            </Button>
          </Stack>
        </Box>
      </Box>
    </Drawer>
  );
};

const SettingBlock = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <Paper
    sx={{
      p: 2,
      mb: 1.8,
      borderRadius: 4,
      border: "1px solid #e5e7eb",
      boxShadow: "0 8px 22px rgba(15,23,42,0.05)",
    }}
  >
    <Typography sx={{ mb: 1.5, fontWeight: 950 }}>{title}</Typography>
    {children}
  </Paper>
);

const SliderSetting = ({
  label,
  value,
  min,
  max,
  step = 1,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (value: number) => void;
}) => (
  <Box>
    <Stack direction="row" sx={{ justifyContent: "space-between", mb: 0.5 }}>
      <Typography sx={{ fontWeight: 800, fontSize: 13 }}>{label}</Typography>
      <Typography sx={{ fontWeight: 900, fontSize: 13 }}>{value}</Typography>
    </Stack>

    <Slider
      value={value}
      min={min}
      max={max}
      step={step}
      onChange={(_, newValue) => onChange(newValue as number)}
    />
  </Box>
);

const SwitchRow = ({
  label,
  checked,
  onChange,
  icon,
}: {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  icon?: React.ReactNode;
}) => (
  <Paper
    sx={{
      p: 1.2,
      borderRadius: 3,
      border: "1px solid #e5e7eb",
      boxShadow: "none",
    }}
  >
    <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "center" }}>
      <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
        {icon}
        <Typography sx={{ fontWeight: 800, fontSize: 13 }}>{label}</Typography>
      </Stack>

      <Switch size="small" checked={checked} onChange={(e) => onChange(e.target.checked)} />
    </Stack>
  </Paper>
);

const ColorPickerField = ({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) => (
  <Box sx={{ mt: 2 }}>
    <Typography sx={{ fontWeight: 900, fontSize: 13, mb: 1 }}>{label}</Typography>

    <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
      <Box
        sx={{
          ".react-colorful": {
            width: "100%",
            height: 120,
          },
        }}
      >
        <HexColorPicker color={value} onChange={onChange} />
      </Box>

      <TextField
        size="small"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        sx={{ minWidth: { sm: 130 } }}
      />
    </Stack>
  </Box>
);

export default ResumeSettingsDrawer;