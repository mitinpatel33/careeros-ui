import {
  Grid,
  Stack,
  Avatar,
  Box,
  IconButton,
  Typography,
} from "@mui/material";
import { Person, PhotoCamera, Close } from "@mui/icons-material";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { memo, useEffect, useRef } from "react";
import { motion } from "framer-motion";

import AnimatedSectionCard from "../../../../components/common/AnimatedSectionCard";
import SaveFooter from "../../../../layouts/SaveFooter";
import AppFormField from "../../../../components/common/AppFormField";

// Helper function to format incoming date string to YYYY-MM-DD for native <input type="date" />
const formatDateForInput = (dateString?: string | null): string => {
  if (!dateString) return "";
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return "";
  return date.toISOString().split("T")[0];
};

const personalSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  jobTitle: z.string().min(1, "Job title is required"),
  dateOfBirth: z.string().optional(),
  gender: z.string().optional(),
  maritalStatus: z.string().optional(),
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

const MAX_PHOTO_SIZE_BYTES = 2 * 1024 * 1024;

const readFileAsDataUrl = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });

const genderOptions = [
  { label: "Male", value: "Male" },
  { label: "Female", value: "Female" },
  { label: "Other", value: "Other" },
];

const maritalStatusOptions = [
  { label: "Single", value: "Single" },
  { label: "Married", value: "Married" },
  { label: "Divorced", value: "Divorced" },
  { label: "Widowed", value: "Widowed" },
];

const PersonalDetails = memo(
  ({ defaultValues, loading, isFirst, isLast, onBack, onSubmit }: Props) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const {
      control,
      handleSubmit,
      reset,
      formState: { errors },
      setError,
      clearErrors,
    } = useForm<PersonalFormType>({
      resolver: zodResolver(personalSchema),
      defaultValues: {
        firstName: "",
        lastName: "",
        jobTitle: "",
        dateOfBirth: formatDateForInput(defaultValues?.dateOfBirth),
        gender: "",
        maritalStatus: "",
        photoUrl: "",
        ...defaultValues,
      },
    });

    useEffect(() => {
      reset({
        firstName: "",
        lastName: "",
        jobTitle: "",
        gender: "",
        maritalStatus: "",
        photoUrl: "",
        ...defaultValues,
        dateOfBirth: formatDateForInput(defaultValues?.dateOfBirth),
      });
    }, [defaultValues, reset]);

    const handlePhotoChange = async (
      event: React.ChangeEvent<HTMLInputElement>,
      onChange: (value: string) => void,
    ) => {
      const file = event.target.files?.[0];
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
        setError("photoUrl", {
          message: "Failed to read image, please try again",
        });
      }
    };

    return (
      <AnimatedSectionCard
        title="Personal Information"
        subtitle="Basic details shown on your resume"
        icon={<Person sx={{ color: "#fdfdfd" }} />}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={3}>
            <Grid
              container
              spacing={{ xs: 2, sm: 2.5 }}
              sx={{ alignItems: "flex-start" }}
            >
              <Grid size={{ xs: 12 }}>
                <Controller
                  name="photoUrl"
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: 2,
                        py: 1,
                      }}
                    >
                      <Box sx={{ position: "relative" }}>
                        <motion.div
                          whileHover={{ scale: 1.04 }}
                          whileTap={{ scale: 0.98 }}
                          transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 20,
                          }}
                        >
                          <Avatar
                            src={value || undefined}
                            sx={{
                              width: { xs: 80, sm: 90 },
                              height: { xs: 80, sm: 90 },
                              bgcolor: "#2563eb",
                              color: "#ffffff",
                              fontWeight: 700,
                              border: "3px solid #ffffff",
                              boxShadow: "0 6px 18px rgba(37, 99, 235, 0.25)",
                            }}
                          >
                            {!value && (
                              <Person sx={{ fontSize: { xs: 40, sm: 46 } }} />
                            )}
                          </Avatar>
                        </motion.div>
                        {value && (
                          <IconButton
                            size="small"
                            onClick={() => onChange("")}
                            aria-label="Remove photo"
                            sx={{
                              position: "absolute",
                              top: -4,
                              right: -4,
                              bgcolor: "#ffffff",
                              color: "#ef4444",
                              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
                              border: "1px solid rgba(254, 202, 202, 0.6)",
                              "&:hover": { bgcolor: "#fef2f2" },
                            }}
                          >
                            <Close fontSize="small" />
                          </IconButton>
                        )}
                      </Box>
                      <Stack spacing={0.5} sx={{ alignItems: "center" }}>
                        <motion.div
                          whileHover={{ y: -1 }}
                          whileTap={{ scale: 0.97 }}
                        >
                          <IconButton
                            component="label"
                            sx={{
                              border: "1px solid rgba(147, 197, 253, 0.5)",
                              borderRadius: "12px",
                              px: 2.5,
                              py: 0.8,
                              width: "fit-content",
                              bgcolor: "rgba(235, 240, 255, 0.4)",
                              color: "#2563eb",
                              backdropFilter: "blur(8px)",
                              transition: "background-color 0.2s ease",
                              "&:hover": {
                                bgcolor: "#ffffff",
                                boxShadow: "0 4px 12px rgba(37, 99, 235, 0.12)",
                              },
                            }}
                          >
                            <PhotoCamera
                              fontSize="small"
                              sx={{ mr: 1, fontSize: 18 }}
                            />
                            <Typography
                              sx={{
                                fontSize: 13,
                                fontWeight: 600,
                                fontFamily: "'Plus Jakarta Sans', sans-serif",
                              }}
                            >
                              {value ? "Change photo" : "Upload photo"}
                            </Typography>
                            <input
                              ref={fileInputRef}
                              type="file"
                              accept="image/*"
                              hidden
                              onChange={(e) => handlePhotoChange(e, onChange)}
                            />
                          </IconButton>
                        </motion.div>
                        {errors.photoUrl?.message ? (
                          <Typography
                            sx={{
                              fontSize: 12,
                              color: "#ef4444",
                              fontFamily: "'Plus Jakarta Sans', sans-serif",
                            }}
                          >
                            {errors.photoUrl.message}
                          </Typography>
                        ) : (
                          <Typography
                            sx={{
                              fontSize: 11,
                              color: "#3b82f6",
                              fontFamily: "'Plus Jakarta Sans', sans-serif",
                              fontWeight: 500,
                            }}
                          >
                            JPG, PNG or GIF. Max 2MB.
                          </Typography>
                        )}
                      </Stack>
                    </Box>
                  )}
                />
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <AppFormField
                  name="firstName"
                  control={control}
                  label="First Name *"
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <AppFormField
                  name="lastName"
                  control={control}
                  label="Last Name *"
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <AppFormField
                  name="jobTitle"
                  control={control}
                  label="Job Title *"
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <AppFormField
                  name="dateOfBirth"
                  control={control}
                  label="Date of Birth"
                  type="date"
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <AppFormField
                  name="gender"
                  control={control}
                  label="Gender"
                  type="radio"
                  options={genderOptions}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <AppFormField
                  name="maritalStatus"
                  control={control}
                  label="Marital Status"
                  type="select"
                  options={maritalStatusOptions}
                />
              </Grid>
            </Grid>
            <SaveFooter
              isFirst={isFirst}
              isLast={isLast}
              loading={loading}
              onBack={onBack}
            />
          </Stack>
        </form>
      </AnimatedSectionCard>
    );
  },
);

PersonalDetails.displayName = "PersonalDetails";
export default PersonalDetails;
