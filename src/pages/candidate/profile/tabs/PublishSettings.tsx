import { useEffect, useState } from "react";
import {
  Box, Typography, Button, IconButton, InputAdornment,
  TextField, Stack, Tooltip, CircularProgress,
} from "@mui/material";
import { Globe, Copy, Check, ExternalLink, Rocket, Edit3, Link2, XCircle, EyeOff } from "lucide-react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { Lottie } from "lottie-react";

import AnimatedSectionCard from "../../../../components/common/AnimatedSectionCard";
import SaveFooter from "../../../../layouts/SaveFooter";
import {
  usePublishProfileMutation,
  useCheckSlugQuery,
  useGetPublishedUrlQuery,
  useUnpublishProfileMutation,
} from "../../../../services/candidateprofileApi";
import successAnimationData from "../../../../assets/success.json";

// .env -> VITE_RESUME_BASE_URL=https://careeros.com/resume
const RESUME_BASE = (import.meta.env.VITE_RESUME_BASE_URL ?? "http://localhost:5000/resume").replace(/\/$/, "");

export type SettingsFormType = {
  resumeTheme: string;
  resumeTemplate: string;
};

type Props = {
  defaultValues?: Partial<SettingsFormType>;
  loading: boolean;
  isFirst: boolean;
  isLast: boolean;
  onBack: () => void;
  onSubmit: (values: SettingsFormType) => Promise<void>;
};

/**
 * Responsive by CONTAINER width, not screen width: this panel sits next to two sidebars,
 * so a 1400px screen can still give it only ~350px. `@container` follows the panel itself.
 */
const responsiveRoot = {
  containerType: "inline-size",
  // narrow panel: prefix hidden in the input, shown as a preview line under it
  "& .url-prefix": { display: "none" },
  "& .url-preview": { display: "block" },
  "@container (min-width: 560px)": {
    "& .url-prefix": { display: "flex" },
    "& .url-preview": { display: "none" },
  },
} as const;

// as many equal columns as fit (3 → 2 → 1); no breakpoints needed
const actionGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
  gap: 1.5,
  "& .MuiButton-root": { minWidth: 0, whiteSpace: "nowrap", textTransform: "none", fontWeight: 600 },
} as const;

const PublishSettings = ({ defaultValues, loading, isFirst, isLast, onBack, onSubmit }: Props) => {
  const { handleSubmit } = useForm<SettingsFormType>({
    defaultValues: { resumeTheme: "Modern", resumeTemplate: "Default", ...defaultValues },
  });

  // saved link comes from the database
  const { data: statusRes, isLoading: isLoadingStatus } = useGetPublishedUrlQuery();
  const status = statusRes?.data;
  const savedSlug = status?.profileSlug ?? "";
  const liveUrl = status?.isPublished ? status.publishedUrl : null;

  const [publishProfile, { isLoading: isPublishing }] = usePublishProfileMutation();
  const [unpublishProfile, { isLoading: isUnpublishing }] = useUnpublishProfileMutation();

  const [slug, setSlug] = useState("");
  const [slugError, setSlugError] = useState<string | null>(null);
  const [publishError, setPublishError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [copied, setCopied] = useState(false);

  // fill the input from the saved slug (on load, and after publish/unpublish)
  useEffect(() => {
    if (!isEditing) setSlug(savedSlug);
  }, [savedSlug, isEditing]);

  const isOriginalSlug = slug === savedSlug;
  const { data: slugCheck, isFetching: isCheckingSlug } = useCheckSlugQuery(slug, {
    skip: slug.length < 3 || isOriginalSlug,
  });

  useEffect(() => {
    if (!slug) return setSlugError(null);
    if (slug.length < 3) return setSlugError("Minimum 3 characters required");
    if (!/^[a-z0-9-]+$/.test(slug)) return setSlugError("Only lowercase letters, numbers, and hyphens allowed");
    if (!isOriginalSlug && slugCheck && !slugCheck.available) return setSlugError("This URL is already taken");
    setSlugError(null);
  }, [slug, slugCheck, isOriginalSlug]);

  const handlePublish = async () => {
    if (slugError || !slug) return;
    setPublishError(null);
    try {
      await publishProfile({ slug }).unwrap(); // tag invalidation refetches the saved link
      setIsEditing(false);
    } catch (err: any) {
      setPublishError(err?.data?.message ?? "Publish failed. Please try again.");
    }
  };

  const handleUnpublish = async () => {
    setPublishError(null);
    try {
      await unpublishProfile().unwrap();
      setIsEditing(false);
    } catch (err: any) {
      setPublishError(err?.data?.message ?? "Could not unpublish. Please try again.");
    }
  };

  const handleCopy = async () => {
    if (!liveUrl) return;
    try {
      await navigator.clipboard.writeText(liveUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard blocked: the URL is still visible and selectable */
    }
  };

  const showSetup = !liveUrl || isEditing;

  return (
    <AnimatedSectionCard title="Publish & Share" subtitle="Your resume, your personal URL" icon={<Globe />}>
      <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ ...responsiveRoot, minWidth: 0 }}>
        <Stack spacing={{ xs: 3, md: 4 }}>
          <Box>
            <Stack direction="row" spacing={1} sx={{ alignItems: "center", mb: 1.5 }}>
              <Link2 size={20} style={{ flexShrink: 0 }} />
              <Typography sx={{ fontWeight: 600, fontSize: { xs: "1rem", sm: "1.25rem" }, lineHeight: 1.3 }}>
                Your Public Profile URL
              </Typography>
            </Stack>

            {isLoadingStatus ? (
              <Box sx={{ display: "grid", placeItems: "center", py: 6 }}>
                <CircularProgress size={28} />
              </Box>
            ) : (
              <AnimatePresence mode="wait">
                {showSetup ? (
                  /* ----------------------------- SETUP / EDIT ----------------------------- */
                  <motion.div
                    key="setup"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Stack
                      spacing={{ xs: 2, sm: 3 }}
                      sx={{ bgcolor: "grey.50", p: { xs: 1.5, sm: 3 }, borderRadius: 3, border: "1px solid", borderColor: "divider" }}
                    >
                      <Box>
                        <Typography variant="body2" sx={{ fontWeight: 500, mb: 1 }}>
                          {liveUrl
                            ? "Edit your custom URL slug"
                            : savedSlug
                              ? "Your link is unpublished. Publish it again"
                              : "Choose your unique URL"}
                        </Typography>

                        <TextField
                          fullWidth
                          placeholder="your-name"
                          value={slug}
                          onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/\s/g, ""))}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault(); // Enter must not submit the whole settings form
                              handlePublish();
                            }
                          }}
                          error={!!slugError}
                          helperText={slugError || `${slug.length}/30`}
                          slotProps={{
                            htmlInput: { maxLength: 30, autoCapitalize: "none", autoCorrect: "off", spellCheck: false },
                            input: {
                              // wide panel only (see .url-prefix in responsiveRoot)
                              startAdornment: (
                                <InputAdornment position="start" className="url-prefix" sx={{ maxWidth: "60%" }}>
                                  <Typography variant="body2" color="text.secondary" noWrap sx={{ fontWeight: 500 }}>
                                    {RESUME_BASE}/
                                  </Typography>
                                </InputAdornment>
                              ),
                              endAdornment: (
                                <InputAdornment position="end">
                                  {isCheckingSlug ? <CircularProgress size={20} />
                                    : slug && !slugError ? <Check size={20} color="#16a34a" />
                                      : slug && slugError ? <XCircle size={20} color="#dc2626" /> : null}
                                </InputAdornment>
                              ),
                            },
                          }}
                          sx={{ "& .MuiOutlinedInput-root": { bgcolor: "white", borderRadius: 2 } }}
                        />

                        {/* narrow panel: full link as a wrapped preview instead of an input prefix */}
                        <Typography
                          className="url-preview"
                          variant="caption"
                          color="text.secondary"
                          sx={{ mt: 0.5, wordBreak: "break-all" }}
                        >
                          Your link: {RESUME_BASE}/<strong>{slug || "your-name"}</strong>
                        </Typography>

                        {publishError && (
                          <Typography variant="caption" color="error" sx={{ mt: 1, display: "block" }}>
                            {publishError}
                          </Typography>
                        )}
                      </Box>

                      <Box sx={actionGrid}>
                        <Button
                          variant="contained"
                          size="large"
                          startIcon={<Rocket size={18} />}
                          onClick={handlePublish}
                          disabled={isPublishing || !!slugError || !slug || isCheckingSlug}
                          sx={{ py: 1.4, borderRadius: 2, gridColumn: liveUrl ? "auto" : "1 / -1" }}
                        >
                          {isPublishing ? "Saving..." : liveUrl ? "Update URL" : "Publish My Resume"}
                        </Button>
                        {liveUrl && (
                          <Button
                            variant="outlined"
                            sx={{ borderRadius: 2 }}
                            onClick={() => { setIsEditing(false); setPublishError(null); }}
                          >
                            Cancel
                          </Button>
                        )}
                      </Box>
                    </Stack>
                  </motion.div>
                ) : (
                  /* ----------------------------- LIVE VIEW ----------------------------- */
                  <motion.div
                    key="live"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4 }}
                  >
                    <Stack
                      spacing={{ xs: 2, sm: 3 }}
                      sx={{ bgcolor: "#f0fdf4", p: { xs: 1.5, sm: 3 }, borderRadius: 3, border: "1px solid #bbf7d0", position: "relative", overflow: "hidden" }}
                    >
                      {/* decorative; sits behind the content, never over a button */}
                      <Box
                        sx={{
                          position: "absolute", zIndex: 0, pointerEvents: "none",
                          top: { xs: -14, sm: -20 }, right: { xs: -14, sm: -20 },
                          width: { xs: 72, sm: 110 }, height: { xs: 72, sm: 110 },
                        }}
                      >
                        <Lottie src={successAnimationData} loop={false} autoplay />
                      </Box>

                      {/* header: wraps instead of colliding; right padding reserves the animation's space */}
                      <Stack
                        direction="row"
                        sx={{
                          position: "relative", zIndex: 1, flexWrap: "wrap", gap: 1,
                          alignItems: "center", justifyContent: "space-between",
                          pr: { xs: 6, sm: 11 },
                        }}
                      >
                        <Stack direction="row" spacing={1} sx={{ alignItems: "center", minWidth: 0 }}>
                          <Check size={24} color="#16a34a" style={{ flexShrink: 0 }} />
                          <Typography sx={{ fontWeight: 600, fontSize: { xs: "0.95rem", sm: "1rem" } }} color="#15803d">
                            Your resume is live!
                          </Typography>
                        </Stack>
                        <Button
                          size="small"
                          startIcon={<Edit3 size={16} />}
                          onClick={() => setIsEditing(true)}
                          sx={{ textTransform: "none", fontWeight: 600, whiteSpace: "nowrap" }}
                        >
                          Edit URL
                        </Button>
                      </Stack>

                      <TextField
                        fullWidth
                        value={liveUrl}
                        slotProps={{
                          htmlInput: {
                            "aria-label": "Your public resume link",
                            onFocus: (e: React.FocusEvent<HTMLInputElement>) => e.target.select(), // tap once, copy easily on mobile
                            style: { textOverflow: "ellipsis" },
                          },
                          input: {
                            readOnly: true,
                            startAdornment: (
                              <InputAdornment position="start" sx={{ display: { xs: "none", sm: "flex" } }}>
                                <Globe size={18} color="#16a34a" />
                              </InputAdornment>
                            ),
                            endAdornment: (
                              <InputAdornment position="end">
                                <Tooltip title={copied ? "Copied!" : "Copy link"}>
                                  <IconButton onClick={handleCopy} edge="end" aria-label="Copy link">
                                    {copied ? <Check size={20} color="#16a34a" /> : <Copy size={20} />}
                                  </IconButton>
                                </Tooltip>
                              </InputAdornment>
                            ),
                          },
                        }}
                        sx={{
                          position: "relative", zIndex: 1,
                          "& .MuiOutlinedInput-root": { bgcolor: "white", borderRadius: 2 },
                          "& .MuiInputBase-input": { fontSize: { xs: "0.85rem", sm: "1rem" } },
                        }}
                      />

                      {publishError && (
                        <Typography variant="caption" color="error" sx={{ position: "relative", zIndex: 1 }}>
                          {publishError}
                        </Typography>
                      )}

                      <Box sx={{ ...actionGrid, position: "relative", zIndex: 1 }}>
                        <Button variant="outlined" startIcon={<Copy size={18} />} onClick={handleCopy}>
                          {copied ? "Copied!" : "Copy Link"}
                        </Button>
                        <Button
                          variant="contained"
                          startIcon={<ExternalLink size={18} />}
                          href={liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          View Live Resume
                        </Button>
                        <Button
                          variant="outlined"
                          color="error"
                          startIcon={<EyeOff size={18} />}
                          onClick={handleUnpublish}
                          disabled={isUnpublishing}
                        >
                          {isUnpublishing ? "Unpublishing..." : "Unpublish"}
                        </Button>
                      </Box>
                    </Stack>
                  </motion.div>
                )}
              </AnimatePresence>
            )}
          </Box>

          <SaveFooter isFirst={isFirst} isLast={isLast} loading={loading} onBack={onBack} />
        </Stack>
      </Box>
    </AnimatedSectionCard>
  );
};

export default PublishSettings;