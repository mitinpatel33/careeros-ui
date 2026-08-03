import { Grid, Stack, Avatar, Box, IconButton, Typography } from "@mui/material";
import { Person, PhotoCamera, Close } from "@mui/icons-material";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { memo, useEffect, useRef } from "react";

import AnimatedSectionCard from "../../../../components/common/AnimatedSectionCard";
import SaveFooter from "../../../../layouts/SaveFooter";
import AppFormField from "../../../../components/common/AppFormField";

const personalSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  jobTitle: z.string().min(1, "Job title is required"),
  dateOfBirth: z.string().optional(),
  gender: z.string().optional(),
  maritalStatus: z.string().optional(),
  nationality: z.string().optional(),
  photoUrl: z.string().optional().or(z.literal("")),
});

export type PersonalFormType = z.infer<typeof personalSchema>;

type Props = {
  defaultValues?: Partial<PersonalFormType>;
  loading: boolean;
  isFirst: boolean;
  isLast: boolean;
  onBack: () => void;
  onSubmit: (values: PersonalFormType) => Promise<void>;
};

// Max file size for the photo upload (in bytes). Base64 encoding inflates
// size by ~33%, so keep the source image reasonably small.
const MAX_PHOTO_SIZE_BYTES = 2 * 1024 * 1024;

const readFileAsDataUrl = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });

const PersonalDetails = memo(({ defaultValues, loading, isFirst, isLast, onBack, onSubmit }: Props) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { control, handleSubmit, reset, formState: { errors }, setError, clearErrors } = useForm<PersonalFormType>({
    resolver: zodResolver(personalSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      jobTitle: "",
      dateOfBirth: "",
      gender: "",
      maritalStatus: "",
      nationality: "",
      photoUrl: "",
      ...defaultValues,
    },
  });

  useEffect(() => {
    reset({
      firstName: "",
      lastName: "",
      jobTitle: "",
      dateOfBirth: "",
      gender: "",
      maritalStatus: "",
      nationality: "",
      photoUrl: "",
      ...defaultValues,
    });
  }, [defaultValues, reset]);

  const handlePhotoChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
    onChange: (value: string) => void,
  ) => {
    const file = event.target.files?.[0];
    // Reset the input value so selecting the same file again re-triggers onChange
    event.target.value = "";
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("photoUrl", { message: "Please select an image file" });
      return;
    }
    if (file.size > MAX_PHOTO_SIZE_BYTES) {
      setError("photoUrl", { message: "Image must be smaller than 2MB" });
      return;
    }

    try {
      const dataUrl = await readFileAsDataUrl(file);
      clearErrors("photoUrl");
      onChange(dataUrl);
    } catch {
      setError("photoUrl", { message: "Failed to read image, please try again" });
    }
  };

  return (
    <AnimatedSectionCard title="Personal Information" subtitle="Basic details shown on your resume" icon={<Person />}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3}>
          <Grid container spacing={2.5}>
            <Grid size={{ xs: 12 }}>
              <Controller
                name="photoUrl"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
                    <Box sx={{ position: "relative" }}>
                      <Avatar src={value || undefined} sx={{ width: 84, height: 84 }}>
                        {!value && <Person sx={{ fontSize: 40 }} />}
                      </Avatar>
                      {value && (
                        <IconButton
                          size="small"
                          onClick={() => onChange("")}
                          aria-label="Remove photo"
                          sx={{
                            position: "absolute",
                            top: -6,
                            right: -6,
                            bgcolor: "background.paper",
                            boxShadow: 1,
                            "&:hover": { bgcolor: "background.paper" },
                          }}
                        >
                          <Close fontSize="small" />
                        </IconButton>
                      )}
                    </Box>
                    <Stack spacing={0.5} alignItems="center">
                      <IconButton
                        component="label"
                        color="primary"
                        sx={{
                          border: "1px solid",
                          borderColor: "divider",
                          borderRadius: 1.5,
                          px: 2,
                          py: 0.75,
                          width: "fit-content",
                        }}
                      >
                        <PhotoCamera fontSize="small" sx={{ mr: 1 }} />
                        <Typography variant="body2">{value ? "Change photo" : "Upload photo"}</Typography>
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          hidden
                          onChange={(e) => handlePhotoChange(e, onChange)}
                        />
                      </IconButton>
                      {errors.photoUrl?.message && (
                        <Typography variant="caption" color="error">
                          {errors.photoUrl.message}
                        </Typography>
                      )}
                      {!errors.photoUrl?.message && (
                        <Typography variant="caption" color="text.secondary">
                          JPG, PNG or GIF. Max 2MB.
                        </Typography>
                      )}
                    </Stack>
                  </Box>
                )}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <AppFormField name="firstName" control={control} label="First Name *" />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <AppFormField name="lastName" control={control} label="Last Name *" />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <AppFormField name="jobTitle" control={control} label="Job Title *" />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <AppFormField name="dateOfBirth" control={control} label="Date of Birth" type="date" />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <AppFormField
                name="gender"
                control={control}
                label="Gender"
                type="radio"
                options={[
                  { label: "Male", value: "Male" },
                  { label: "Female", value: "Female" },
                  { label: "Other", value: "Other" },
                ]}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <AppFormField
                name="maritalStatus"
                control={control}
                label="Marital Status"
                type="select"
                options={[
                  { label: "Single", value: "Single" },
                  { label: "Married", value: "Married" },
                ]}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <AppFormField name="nationality" control={control} label="Nationality" />
            </Grid>
          </Grid>
          <SaveFooter isFirst={isFirst} isLast={isLast} loading={loading} onBack={onBack} />
        </Stack>
      </form>
    </AnimatedSectionCard>
  );
});

PersonalDetails.displayName = "PersonalDetails";
export default PersonalDetails;