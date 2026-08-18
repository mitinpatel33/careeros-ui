import { useState, useEffect } from "react";
import {
  Box, Typography, Button, IconButton, InputAdornment,
  TextField, Stack, Tooltip, CircularProgress
} from "@mui/material";
import {
  Globe, Copy, Check, ExternalLink, Rocket, Edit3, Link2,
  XCircle
} from "lucide-react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { Lottie } from "lottie-react";

import AnimatedSectionCard from "../../../../components/common/AnimatedSectionCard";
import SaveFooter from "../../../../layouts/SaveFooter";
import {
  usePublishProfileMutation,
  useCheckSlugQuery,
} from "../../../../services/candidateprofileApi";
import successAnimationData from "../../../../assets/success.json";

const DOMAIN = "http://localhost:5000/resume";

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
  const { handleSubmit } = useForm<SettingsFormType>({
    defaultValues: {
      resumeTheme: "Modern",
      resumeTemplate: "Default",
      ...defaultValues,
    },
  });

  const [publishProfile, { isLoading: isPublishing }] = usePublishProfileMutation();

  const [slug, setSlug] = useState("");
  const [slugError, setSlugError] = useState<string | null>(null);
  const [publishedUrl, setPublishedUrl] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [copied, setCopied] = useState(false);

  // FIX: Sync state whenever defaultValues update from API
  useEffect(() => {
    if (defaultValues?.profileSlug) {
      setSlug(defaultValues.profileSlug);
    }
    if (defaultValues?.publishedUrl) {
      setPublishedUrl(defaultValues.publishedUrl);
    }
  }, [defaultValues?.profileSlug, defaultValues?.publishedUrl]);

  const isOriginalSlug = slug === defaultValues?.profileSlug;
  const { data: slugCheck, isFetching: isCheckingSlug } = useCheckSlugQuery(slug, {
    skip: slug.length < 3 || isOriginalSlug,
  });

  useEffect(() => {
    if (!slug) {
      setSlugError(null);
      return;
    }
    if (slug.length < 3) {
      setSlugError("Minimum 3 characters required");
      return;
    }
    if (!/^[a-z0-9-]+$/.test(slug)) {
      setSlugError("Only lowercase letters, numbers, and hyphens allowed");
      return;
    }
    if (!isOriginalSlug && slugCheck && !slugCheck.available) {
      setSlugError("This URL is already taken");
      return;
    }
    setSlugError(null);
  }, [slug, slugCheck, isOriginalSlug]);

  const handlePublish = async () => {
    if (slugError || !slug) return;
    try {
      const result = await publishProfile({ slug }).unwrap();
      setPublishedUrl(result.url || `${DOMAIN}/${slug}`);
      setIsEditing(false);
    } catch (err) {
      console.error("Publish failed", err);
    }
  };

  // const handleUnpublish = async () => {
  //   try {
  //     await unpublishProfile().unwrap();
  //     setPublishedUrl(null);
  //     setSlug("");
  //     setIsEditing(false);
  //   } catch (err) {
  //     console.error("Unpublish failed", err);
  //   }
  // };
  // 

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
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 600 }} gutterBottom>
              <Link2 size={20} style={{ marginRight: 8 }} />
              Your Public Profile URL
            </Typography>

            <AnimatePresence mode="wait">
              {!publishedUrl || isEditing ? (
                /* EDIT/SETUP VIEW */
                <motion.div
                  key="setup"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                >
                  <Stack spacing={3} sx={{ bgcolor: "grey.50", p: { xs: 2, md: 3 }, borderRadius: 3, border: "1px solid", borderColor: "divider" }}>
                    <Box>
                      <Typography variant="body2" sx={{ fontWeight: 500, mb: 1 }}>
                        {publishedUrl ? "Edit your custom URL slug" : "Choose your unique URL"}
                      </Typography>
                      <TextField
                        fullWidth
                        placeholder="your-name"
                        value={slug}
                        onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/\s/g, ""))}
                        error={!!slugError}
                        helperText={slugError || `${slug.length}/30`}
                        slotProps={{
                          input: {
                            startAdornment: (
                              <InputAdornment position="start">
                                <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                                  http://localhost:5000/resume/
                                </Typography>
                              </InputAdornment>
                            ),
                            endAdornment: (
                              <InputAdornment position="end">
                                {isCheckingSlug ? <CircularProgress size={20} /> :
                                  slug && !slugError ? <Check size={20} color="#16a34a" /> :
                                  slug && slugError ? <XCircle size={20} color="#dc2626" /> : null}
                              </InputAdornment>
                            ),
                          },
                        }}
                        sx={{ "& .MuiOutlinedInput-root": { bgcolor: "white", borderRadius: 2 } }}
                      />
                    </Box>

                    <Stack direction="row" spacing={2}>
                      <Button
                        variant="contained" size="large" fullWidth
                        startIcon={<Rocket size={18} />}
                        onClick={handlePublish}
                        disabled={isPublishing || !!slugError || !slug || isCheckingSlug}
                        sx={{ py: 1.5, borderRadius: 2, textTransform: "none", fontWeight: 600 }}
                      >
                        {isPublishing ? "Saving..." : publishedUrl ? "Update URL" : "Publish My Resume"}
                      </Button>

                      {publishedUrl && (
                        <Button variant="outlined" onClick={() => setIsEditing(false)}>
                          Cancel
                        </Button>
                      )}
                    </Stack>
                  </Stack>
                </motion.div>
              ) : (
                /* LIVE PUBLISHED VIEW WITH VIDEO/ANIMATION */
                <motion.div
                  key="live"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                >
                  <Stack spacing={3} sx={{ bgcolor: "#f0fdf4", p: { xs: 2, md: 3 }, borderRadius: 3, border: "1px solid #bbf7d0", position: "relative", overflow: "hidden" }}>
                    
                    {/* Animated Lottie Banner Effect */}
                    <Box sx={{ position: "absolute", top: -20, right: -20, width: 120, height: 120, pointerEvents: "none" }}>
                      <Lottie src={successAnimationData} loop={false} autoplay />
                    </Box>

                    <Stack direction="row" sx={{ alignItems: "center", justifyContent: "space-between" }}>
                      <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
                        <Check size={24} color="#16a34a" />
                        <Typography sx={{ fontWeight: 600 }} color="#15803d">Your resume is live!</Typography>
                      </Stack>
                      <Button
                        size="small"
                        startIcon={<Edit3 size={16} />}
                        onClick={() => setIsEditing(true)}
                        sx={{ textTransform: "none", fontWeight: 600 }}
                      >
                        Edit URL
                      </Button>
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
                                  {copied ? <Check size={20} color="#16a34a" /> : <Copy size={20} />}
                                </IconButton>
                              </Tooltip>
                            </InputAdornment>
                          ),
                        },
                      }}
                      sx={{ "& .MuiOutlinedInput-root": { bgcolor: "white", borderRadius: 2 } }}
                    />

                    <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                      <Button variant="outlined" startIcon={<Copy size={18} />} onClick={handleCopy} fullWidth>
                        Copy Link
                      </Button>
                      <Button variant="contained" startIcon={<ExternalLink size={18} />} href={publishedUrl} target="_blank" rel="noopener noreferrer" fullWidth sx={{ textTransform: "none" }}>
                        View Live Resume
                      </Button>
                      {/* <Button variant="text" color="error" startIcon={<XCircle size={18} />} onClick={handleUnpublish} disabled={isUnpublishing} fullWidth>
                        {isUnpublishing ? "Unpublishing..." : "Unpublish"}
                      </Button> */}
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