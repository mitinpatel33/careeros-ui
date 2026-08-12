import { Grid, Stack, Avatar, Box, Typography, Chip, Paper, Button, CircularProgress, TextField } from "@mui/material";
import { Business, Verified, UploadFile } from "@mui/icons-material";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { memo, useEffect, useRef, useState } from "react";

import { useAppSelector } from "../../../hooks/useLogin";
import { useGetCompanyProfileQuery, useSaveCompanyProfileMutation, useUploadCompanyLogoMutation } from "../../../services/companyprofileApi";
import AppSnackbar from "../../../components/common/AppSnackbar";
import AppFormField from "../../../components/common/AppFormField";
import { companyProfileSchema, type CompanyProfileFormType } from "../../../validation/companyProfile.validation";

const ALLOWED_LOGO_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX_LOGO_SIZE_BYTES = 5 * 1024 * 1024;
const MAX_LOGO_SIZE_MB = 5;

const VERIFICATION_META: Record<string, { label: string; color: "warning" | "success" | "error" }> = {
  Pending: { label: "Verification Pending", color: "warning" },
  Verified: { label: "Verified", color: "success" },
  Rejected: { label: "Verification Rejected", color: "error" },
};

const CompanyProfilePage = memo(() => {
  const userId = useAppSelector((state) => state.auth.user?.userId);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [selectedLogoFile, setSelectedLogoFile] = useState<File | null>(null);
  const [logoPreviewUrl, setLogoPreviewUrl] = useState<string>();
  const [logoError, setLogoError] = useState<string | null>(null);
  const [toast, setToast] = useState<{ open: boolean; message: string; severity: "success" | "error" }>({
    open: false,
    message: "",
    severity: "success",
  });

  const {
    data: profile,
    isLoading: isProfileLoading,
  } = useGetCompanyProfileQuery();

  const [saveCompanyProfile, { isLoading: isSaving }] = useSaveCompanyProfileMutation();
  const [uploadCompanyLogo, { isLoading: isUploadingLogo }] = useUploadCompanyLogoMutation();

  const { control, handleSubmit, reset, watch, formState: { errors } } = useForm<CompanyProfileFormType>({
    resolver: zodResolver(companyProfileSchema),
    defaultValues: {
      companyName: "",
      website: "",
      industry: "",
      companySize: "",
      companyEmail: "",
      location: "",
      aboutCompany: "",
    },
  });

  const aboutCompanyValue = watch("aboutCompany") || "";

  // Cache is the single source of truth now — just sync the form when it updates.
  useEffect(() => {
    if (profile) {
      reset({
        companyName: profile.companyName ?? "",
        website: profile.website ?? "",
        industry: profile.industry ?? "",
        companySize: profile.companySize ?? "",
        companyEmail: profile.companyEmail ?? "",
        location: profile.location ?? "",
        aboutCompany: profile.aboutCompany ?? "",
      });
    }
  }, [profile, reset]);

  useEffect(() => {
    if (!selectedLogoFile) {
      setLogoPreviewUrl(undefined);
      return;
    }
    const objectUrl = URL.createObjectURL(selectedLogoFile);
    setLogoPreviewUrl(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedLogoFile]);

  const validateLogo = (file: File): string | null => {
    if (!ALLOWED_LOGO_TYPES.includes(file.type)) return "Logo must be a JPEG, PNG, or WEBP image.";
    if (file.size > MAX_LOGO_SIZE_BYTES) return `Logo must be smaller than ${MAX_LOGO_SIZE_MB}MB.`;
    return null;
  };

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const validationError = validateLogo(file);
    if (validationError) {
      setLogoError(validationError);
      setSelectedLogoFile(null);
    } else {
      setLogoError(null);
      setSelectedLogoFile(file);
    }
    e.target.value = "";
  };

  const onSubmit = async (formData: CompanyProfileFormType) => {
    if (!selectedLogoFile && !profile?.logoUrl) {
      setLogoError("Company logo is required");
      return;
    }
    if (selectedLogoFile) {
      const validationError = validateLogo(selectedLogoFile);
      if (validationError) {
        setLogoError(validationError);
        return;
      }
    }

    try {
      if (selectedLogoFile) {
        const formDataObj = new FormData();
        formDataObj.append("logo", selectedLogoFile);
        await uploadCompanyLogo(formDataObj).unwrap();
      }

      await saveCompanyProfile(formData).unwrap();

      setSelectedLogoFile(null);
      setLogoError(null);

      setToast({ open: true, severity: "success", message: "Company profile saved successfully." });
    } catch (error: any) {
      setToast({
        open: true,
        severity: "error",
        message: error?.data?.message || "Failed to save company profile.",
      });
    }
  };

  const verification = VERIFICATION_META[profile?.verificationStatus ?? ""] ?? VERIFICATION_META.Pending;
  const ASSET_BASE_URL = (import.meta.env.VITE_API_BASE_URL ?? "").replace(/\/api\/?$/, "");

  const logoSrc = selectedLogoFile
    ? logoPreviewUrl
    : profile?.logoUrl
      ? `${ASSET_BASE_URL}${profile.logoUrl}`
      : undefined;

  const isSubmitting = isSaving || isUploadingLogo;
  const hasLogo = !!logoSrc;

  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 900 }}>
        Company Profile 🏢
      </Typography>

      <Typography color="text.secondary" sx={{ mb: 3 }}>
        Manage company details and verification.
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 4 }}>
            <Paper sx={{ p: 3, borderRadius: 5 }}>
              <Stack sx={{ alignItems: "center" }} spacing={2}>
                <Avatar
                  src={logoSrc}
                  sx={{
                    width: 110,
                    height: 110,
                    bgcolor: "primary.main",
                    borderColor: logoError ? "error.main" : "transparent",
                    borderStyle: "solid",
                    borderWidth: 2,
                  }}
                >
                  <Business fontSize="large" />
                </Avatar>

                <Typography variant="h6" sx={{ fontWeight: 900 }}>
                  {profile?.companyName || "Your Company"}
                </Typography>

                <Chip icon={<Verified />} label={verification.label} color={verification.color} sx={{ fontWeight: 800 }} />

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/png,image/jpeg,image/webp"
                  hidden
                  onChange={handleLogoChange}
                />

                <Button
                  variant="outlined"
                  startIcon={isSubmitting ? <CircularProgress size={16} /> : <UploadFile />}
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isSubmitting || isProfileLoading}
                  color={logoError ? "error" : "primary"}
                >
                  {selectedLogoFile || hasLogo ? "Change Logo" : "Choose Logo"}
                </Button>

                {selectedLogoFile && (
                  <Typography variant="caption" color="text.secondary" sx={{ textAlign: "center" }}>
                    Selected file: {selectedLogoFile.name}
                  </Typography>
                )}

                {logoError && (
                  <Typography variant="caption" color="error" sx={{ textAlign: "center" }}>
                    {logoError}
                  </Typography>
                )}

                {!logoError && !selectedLogoFile && (
                  <Typography variant="caption" color="text.secondary" sx={{ textAlign: "center" }}>
                    JPEG, PNG, or WEBP. Max {MAX_LOGO_SIZE_MB}MB.
                  </Typography>
                )}
              </Stack>
            </Paper>
          </Grid>

          <Grid size={{ xs: 12, md: 8 }}>
            <Paper sx={{ p: 3, borderRadius: 5 }}>
              <Grid container spacing={2}>
                <Grid size={{ xs: 12, md: 6 }}>
                  <AppFormField name="companyName" control={control} label="Company Name *" disabled={isProfileLoading} />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <AppFormField name="website" control={control} label="Website *" disabled={isProfileLoading} />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <AppFormField name="industry" control={control} label="Industry *" disabled={isProfileLoading} />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <AppFormField name="companySize" control={control} label="Company Size *" disabled={isProfileLoading} />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <AppFormField name="companyEmail" control={control} label="Company Email *" type="email" disabled={isProfileLoading} />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <AppFormField name="location" control={control} label="Location *" disabled={isProfileLoading} />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <Controller
                    name="aboutCompany"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        label="About Company *"
                        multiline
                        rows={5}
                        disabled={isProfileLoading}
                        error={!!errors.aboutCompany}
                        helperText={errors.aboutCompany?.message || `${aboutCompanyValue.length}/3000 characters`}
                      />
                    )}
                  />
                </Grid>
              </Grid>

              <Stack direction="row" sx={{ justifyContent: "flex-end", mt: 3 }}>
                <Button
                  variant="contained"
                  type="submit"
                  disabled={isSubmitting || isProfileLoading}
                  startIcon={isSubmitting ? <CircularProgress size={16} /> : null}
                >
                  {isSubmitting ? "Saving..." : "Save Company Profile"}
                </Button>
              </Stack>
            </Paper>
          </Grid>
        </Grid>
      </form>

      <AppSnackbar
        successMessage={toast.severity === "success" ? toast.message : ""}
        errorMessage={toast.severity === "error" ? toast.message : ""}
        onCloseSuccess={() => setToast({ ...toast, open: false })}
        onCloseError={() => setToast({ ...toast, open: false })}
      />
    </Box>
  );
});

CompanyProfilePage.displayName = "CompanyProfilePage";
export default CompanyProfilePage;