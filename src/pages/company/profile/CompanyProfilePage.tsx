import { Grid, Stack, Avatar, Box, Typography, Chip, Paper, Button, CircularProgress, TextField } from "@mui/material";
import { Business, Verified, UploadFile } from "@mui/icons-material";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { memo, useEffect, useRef, useState } from "react";

import { useAppSelector } from "../../../hooks/useLogin";
import { useGetCompanyProfileQuery, useSaveCompanyProfileMutation, useUploadCompanyLogoMutation } from "../../../services/companyprofileApi";
import AppSnackbar from "../../../components/common/AppSnackbar";
import AppFormField from "../../../components/common/AppFormField";

// Constants
const ALLOWED_LOGO_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX_LOGO_SIZE_BYTES = 5 * 1024 * 1024; // 5MB
const MAX_LOGO_SIZE_MB = 5;

// Zod Schema for validation (without logo)
const companyProfileSchema = z.object({
  companyName: z.string().min(1, "Company name is required"),
  website: z.string()
    .url("Enter a valid website URL")
    .min(1, "Website is required"),
  industry: z.string().min(1, "Industry is required"),
  companySize: z.string()
    .regex(/^\d+(-\d+|\+)?$/, "Use a format like 1-10, 50-200, or 500+")
    .min(1, "Company size is required"),
  companyEmail: z.string().email("Enter a valid email address")
    .min(1, "Company email is required"),
  location: z.string().min(1, "Location is required"),
  aboutCompany: z.string()
    .min(20, "About company must be at least 20 characters")
    .max(3000, "About company must be under 3000 characters")
    .min(1, "Tell candidates a bit about the company"),
});

export type CompanyProfileFormType = z.infer<typeof companyProfileSchema>;

// Shape of the profile data we keep in local state, driven by the query
// and refreshed after every successful save.
type CompanyProfileData = {
  companyName?: string;
  website?: string;
  industry?: string;
  companySize?: string;
  companyEmail?: string;
  location?: string;
  aboutCompany?: string;
  logoUrl?: string;
  verificationStatus?: string;
};

const VERIFICATION_META: Record<
  string,
  { label: string; color: "warning" | "success" | "error" }
> = {
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
  const [toast, setToast] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error";
  }>({ open: false, message: "", severity: "success" });

  const [companyProfileData, setCompanyProfileData] = useState<CompanyProfileData | null>(null);

  // API hooks
  const {
    data: profile,
    isLoading: isProfileLoading,
    refetch: refetchProfile,
  } = useGetCompanyProfileQuery(userId);

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

  // Watch aboutCompany value for character count
  const aboutCompanyValue = watch("aboutCompany") || "";

  // Whenever the query returns fresh data (initial load or refetch), sync it
  // into local state and populate the form fields from it.
  useEffect(() => {
    if (profile) {
      setCompanyProfileData(profile);

      reset({
        companyName: profile?.companyName ?? "",
        website: profile?.website ?? "",
        industry: profile?.industry ?? "",
        companySize: profile?.companySize ?? "",
        companyEmail: profile?.companyEmail ?? "",
        location: profile?.location ?? "",
        aboutCompany: profile?.aboutCompany ?? "",
      });
    }
  }, [profile, reset]);

  // Handle logo preview
  useEffect(() => {
    if (!selectedLogoFile) {
      setLogoPreviewUrl(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedLogoFile);

    console.log("Created object URL for logo preview:", objectUrl);
    setLogoPreviewUrl(objectUrl);

    return () => {
      URL.revokeObjectURL(objectUrl);
    };
  }, [selectedLogoFile]);

  const validateLogo = (file: File): string | null => {
    if (!ALLOWED_LOGO_TYPES.includes(file.type)) {
      return "Logo must be a JPEG, PNG, or WEBP image.";
    }
    if (file.size > MAX_LOGO_SIZE_BYTES) {
      return `Logo must be smaller than ${MAX_LOGO_SIZE_MB}MB.`;
    }
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
    // Check if logo is required and not provided
    if (!selectedLogoFile && !companyProfileData?.logoUrl) {
      setLogoError("Company logo is required");
      return;
    }

    // Validate logo file if selected
    if (selectedLogoFile) {
      const validationError = validateLogo(selectedLogoFile);
      if (validationError) {
        setLogoError(validationError);
        return;
      }
    }

    try {
      // 1. Upload Logo if changed
      if (selectedLogoFile) {
        const formDataObj = new FormData();
        formDataObj.append("logo", selectedLogoFile);
        await uploadCompanyLogo(formDataObj).unwrap();
      }

      // 2. Save Company Details
      await saveCompanyProfile({
        userId,
        companyName: formData.companyName,
        website: formData.website,
        industry: formData.industry,
        companySize: formData.companySize,
        companyEmail: formData.companyEmail,
        location: formData.location,
        aboutCompany: formData.aboutCompany,
      }).unwrap();

      // 3. Re-run useGetCompanyProfileQuery to pull the freshly saved data
      const latestProfile = await refetchProfile().unwrap();

      // 4. Push the latest data into local state — this is what the avatar,
      // chip, and company name in the left column render from.
      setCompanyProfileData(latestProfile);

      // 5. Reset the form fields with the latest data too
      reset({
        companyName: latestProfile?.companyName ?? "",
        website: latestProfile?.website ?? "",
        industry: latestProfile?.industry ?? "",
        companySize: latestProfile?.companySize ?? "",
        companyEmail: latestProfile?.companyEmail ?? "",
        location: latestProfile?.location ?? "",
        aboutCompany: latestProfile?.aboutCompany ?? "",
      });

      setSelectedLogoFile(null);
      setLogoError(null);

      setToast({
        open: true,
        severity: "success",
        message: "Company profile saved successfully.",
      });
    } catch (error: any) {
      setToast({
        open: true,
        severity: "error",
        message: error?.data?.message || "Failed to save company profile.",
      });
    }
  };

  // Everything below reads from local state, not directly from the query cache,
  // so the page shows exactly what was last loaded/saved, consistently.
  const displayProfile = companyProfileData;
  const verification = VERIFICATION_META[displayProfile?.verificationStatus ?? ""] ?? VERIFICATION_META.Pending;
  const ASSET_BASE_URL = (import.meta.env.VITE_API_BASE_URL ?? "").replace(/\/api\/?$/, "");

  const logoSrc = selectedLogoFile
    ? logoPreviewUrl : displayProfile?.logoUrl
      ? `${ASSET_BASE_URL}${displayProfile.logoUrl}`
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
          {/* Left Column - Logo and Verification */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Paper sx={{ p: 3, borderRadius: 5 }}>
              <Stack sx={{ alignItems: "center" }} spacing={2}>
                <Avatar
                  src={logoSrc}
                  onError={(e) => console.error("Avatar image failed to load:", logoSrc, e)}
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
                  {displayProfile?.companyName || "Your Company"}
                </Typography>

                <Chip
                  icon={<Verified />}
                  label={verification.label}
                  color={verification.color}
                  sx={{ fontWeight: 800 }}
                />

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/png,image/jpeg,image/webp"
                  hidden
                  onChange={handleLogoChange}
                />

                <Button
                  variant="outlined"
                  startIcon={
                    isSubmitting ? (
                      <CircularProgress size={16} />
                    ) : (
                      <UploadFile />
                    )
                  }
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isSubmitting || isProfileLoading}
                  color={logoError ? "error" : "primary"}
                >
                  {selectedLogoFile ? "Change Logo" : hasLogo ? "Change Logo" : "Choose Logo"}
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

          {/* Right Column - Form Fields */}
          <Grid size={{ xs: 12, md: 8 }}>
            <Paper sx={{ p: 3, borderRadius: 5 }}>
              <Grid container spacing={2}>
                <Grid size={{ xs: 12, md: 6 }}>
                  <AppFormField
                    name="companyName"
                    control={control}
                    label="Company Name *"
                    disabled={isProfileLoading}
                  />
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                  <AppFormField
                    name="website"
                    control={control}
                    label="Website *"
                    disabled={isProfileLoading}
                  />
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                  <AppFormField
                    name="industry"
                    control={control}
                    label="Industry *"
                    disabled={isProfileLoading}
                  />
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                  <AppFormField
                    name="companySize"
                    control={control}
                    label="Company Size *"
                    disabled={isProfileLoading}
                  />
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                  <AppFormField
                    name="companyEmail"
                    control={control}
                    label="Company Email *"
                    type="email"
                    disabled={isProfileLoading}
                  />
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                  <AppFormField
                    name="location"
                    control={control}
                    label="Location *"
                    disabled={isProfileLoading}
                  />
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
                        helperText={
                          errors.aboutCompany?.message ||
                          `${aboutCompanyValue.length}/3000 characters`
                        }
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
    </Box >
  );
});

CompanyProfilePage.displayName = "CompanyProfilePage";
export default CompanyProfilePage;