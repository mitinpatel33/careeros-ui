import { useState, useEffect } from "react";
import {
  Box, Grid, Typography, Button, IconButton, InputAdornment,
  TextField, Stack, Tooltip, Divider, CircularProgress, Alert
} from "@mui/material";
import {
  Globe, Copy, Check, ExternalLink, Rocket, Settings as SettingsIcon,
  Link2, XCircle
} from "lucide-react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedSectionCard from "../../../../components/common/AnimatedSectionCard";
import AppTextField from "../../../../components/common/AppTextField";
import SaveFooter from "../../../../layouts/SaveFooter";
import {
  usePublishProfileMutation,
  useCheckSlugQuery,
} from "../../../../services/candidateprofileApi";

const DOMAIN = "resume.dev"; // replace with your real domain

export type SettingsFormType = {
  resumeTheme: string;
  resumeTemplate: string;
};

type Props = {
  defaultValues?: Partial<SettingsFormType & { profileSlug?: string; publishedUrl?: string }>;
  loading: boolean;
  isFirst: boolean;
  isLast: boolean;
  onBack: () => void;
  onSubmit: (values: SettingsFormType) => Promise<void>;
};

const PublishSettings = ({
  defaultValues,
  loading,
  isFirst,
  isLast,
  onBack,
  onSubmit,
}: Props) => {
  const { control, handleSubmit } = useForm<SettingsFormType>({
    defaultValues: {
      resumeTheme: "Modern",
      resumeTemplate: "Default",
      ...defaultValues,
    },
  });

  const [publishProfile, { isLoading: isPublishing }] = usePublishProfileMutation();
  const [slug, setSlug] = useState(defaultValues?.profileSlug || "");
  const [slugError, setSlugError] = useState<string | null>(null);
  const [publishedUrl, setPublishedUrl] = useState<string | null>(
    defaultValues?.publishedUrl || null
  );
  const [copied, setCopied] = useState(false);

  // Check slug availability
  const { data: slugCheck, isFetching: isCheckingSlug } = useCheckSlugQuery(slug, {
    skip: slug.length < 3,
  });

  // Validate slug
  useEffect(() => {
    if (!slug) {
      setSlugError(null);
      return;
    }
    if (slug.length < 3) {
      setSlugError("Minimum 3 characters");
      return;
    }
    if (!/^[a-z0-9-]+$/.test(slug)) {
      setSlugError("Only lowercase letters, numbers, and hyphens");
      return;
    }
    if (slugCheck && !slugCheck.available) {
      setSlugError("This URL is already taken");
      return;
    }
    setSlugError(null);
  }, [slug, slugCheck]);

  // Reset publishedUrl if defaultValues changes
  useEffect(() => {
    if (defaultValues?.publishedUrl) {
      setPublishedUrl(defaultValues.publishedUrl);
    }
  }, [defaultValues?.publishedUrl]);

  const handlePublish = async () => {
    if (slugError || !slug) return;
    try {
      const result = await publishProfile({ slug }).unwrap();
      setPublishedUrl(result.url);
    } catch (err) {
      console.error("Publish failed", err);
    }
  };

  const handleCopy = async () => {
    if (!publishedUrl) return;
    await navigator.clipboard.writeText(publishedUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AnimatedSectionCard title="Publish & Share" subtitle="Your resume, your personal URL" icon={<Globe />}>
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={4}>
          {/* Custom URL & Publish */}
          <Box>
            <Typography variant="h6" sx={{fontWeight: 600}} gutterBottom>
              <Link2 size={20} style={{ marginRight: 8 }} />
              Your Public Profile URL
            </Typography>

            <AnimatePresence mode="wait">
              {!publishedUrl ? (
                <motion.div key="setup" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}>
                  <Stack spacing={3} sx={{ bgcolor: "grey.50", p: { xs: 2, md: 3 }, borderRadius: 3, border: "1px solid", borderColor: "divider" }}>
                    <Box>
                      <Typography variant="body2" sx={{fontWeight: 500, mb: 1}}>Choose your unique URL</Typography>
                      <TextField
                        fullWidth
                        placeholder="your-name"
                        value={slug}
                        onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/\s/g, ""))}
                        error={!!slugError}
                        helperText={slugError || `${slug.length}/30`}
                        slotProps={{
                          input: {
                            // inputProps={{ maxLength: 30 }},
                            startAdornment: (
                              <InputAdornment position="start">
                                <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>https://</Typography>
                              </InputAdornment>
                            ),
                            endAdornment: (
                              <InputAdornment position="end">
                                {isCheckingSlug ? <CircularProgress size={20} /> :
                                  slug && !slugError ? <Check size={20} color="#16a34a" /> :
                                  slug && slugError ? <XCircle size={20} color="#dc2626" /> : null}
                                <Typography variant="body2" color="text.secondary" sx={{ ml: 0.5, fontWeight: 500 }}>.{DOMAIN}</Typography>
                              </InputAdornment>
                            ),
                          },
                        }}
                        sx={{ "& .MuiOutlinedInput-root": { bgcolor: "white", borderRadius: 2 } }}
                      />
                    </Box>

                    <Button
                      variant="contained" size="large" fullWidth
                      startIcon={<Rocket size={18} />}
                      onClick={handlePublish}
                      disabled={isPublishing || !!slugError || !slug || isCheckingSlug}
                      sx={{ py: 1.5, borderRadius: 2, textTransform: "none", fontWeight: 600, boxShadow: "0 4px 14px rgba(25,118,210,0.3)", "&:hover": { boxShadow: "0 6px 20px rgba(25,118,210,0.4)" } }}
                    >
                      {isPublishing ? "Publishing..." : "Publish My Resume"}
                    </Button>
                    <Alert severity="info" icon={false} sx={{ borderRadius: 2 }}>This URL will be publicly visible. You can change it later.</Alert>
                  </Stack>
                </motion.div>
              ) : (
                <motion.div key="live" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4, ease: "easeOut" }}>
                  <Stack spacing={3} sx={{ bgcolor: "#f0fdf4", p: { xs: 2, md: 3 }, borderRadius: 3, border: "1px solid #bbf7d0" }}>
                    <Stack direction="row" spacing={1} sx={{alignItems: "center"}}>
                      <Check size={24} color="#16a34a" />
                      <Typography sx={{fontWeight: 600}} color="#15803d">Your resume is live!</Typography>
                    </Stack>

                    <TextField
                      fullWidth
                      value={publishedUrl}
                      variant="outlined"
                      slotProps={{
                        input: {
                          readOnly: true,
                          startAdornment: (
                            <InputAdornment position="start"><Globe size={18} color="#16a34a" /></InputAdornment>
                          ),
                          endAdornment: (
                            <InputAdornment position="end">
                              <Tooltip title={copied ? "Copied!" : "Copy link"}>
                                <IconButton onClick={handleCopy}>
                                  {copied ? (
                                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                                      <Check size={20} color="#16a34a" />
                                    </motion.div>
                                  ) : (
                                    <Copy size={20} />
                                  )}
                                </IconButton>
                              </Tooltip>
                            </InputAdornment>
                          ),
                        },
                      }}
                      sx={{ "& .MuiOutlinedInput-root": { bgcolor: "white", borderRadius: 2 } }}
                    />

                    <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                      <Button variant="outlined" startIcon={<Copy size={18} />} onClick={handleCopy} fullWidth>Copy Link</Button>
                      <Button variant="contained" startIcon={<ExternalLink size={18} />} href={publishedUrl} target="_blank" rel="noopener noreferrer" fullWidth sx={{ textTransform: "none" }}>View Live Resume</Button>
                      <Button variant="text" color="error" startIcon={<XCircle size={18} />} onClick={() => { setPublishedUrl(null); setSlug(""); }} fullWidth>Unpublish</Button>
                    </Stack>
                  </Stack>
                </motion.div>
              )}
            </AnimatePresence>
          </Box>

          <SaveFooter isFirst={isFirst} isLast={isLast} loading={loading} onBack={onBack} />
        </Stack>
      </Box>
    </AnimatedSectionCard>
  );
};

export default PublishSettings;