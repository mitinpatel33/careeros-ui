import { Grid, Stack } from "@mui/material";
import { Person } from "@mui/icons-material";
import { useForm } from "react-hook-form";

import AnimatedSectionCard from "../../../../components/common/AnimatedSectionCard";
import SaveFooter from "../../../../layouts/SaveFooter";
import AppFormField from "../../../../components/common/AppFormField";
import { useEffect } from "react";

export type PersonalFormType = {
  firstName: string;
  lastName: string;
  jobTitle: string;
  dateOfBirth: string;
  gender: string;
  maritalStatus: string;
  nationality: string;
  photoUrl: string;
};

type Props = {
  defaultValues?: Partial<PersonalFormType>;
  loading: boolean;
  isFirst: boolean;
  isLast: boolean;
  onBack: () => void;
  onSubmit: (values: PersonalFormType) => Promise<void>;
};

const PersonalDetails = ({
  defaultValues,
  loading,
  isFirst,
  isLast,
  onBack,
  onSubmit,
}: Props) => {
  const { control, handleSubmit, reset } = useForm<PersonalFormType>({
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

  console.log("defaultValues", defaultValues);

  return (
    <AnimatedSectionCard
      title="Personal Information"
      subtitle="Basic details shown on your resume"
      icon={<Person />}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3}>
          <Grid container spacing={2.5}>
            <Grid size={{ xs: 12, md: 6 }}>
              <AppFormField
                name="firstName"
                control={control}
                label="First Name"
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <AppFormField
                name="lastName"
                control={control}
                label="Last Name"
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <AppFormField
                name="jobTitle"
                control={control}
                label="Job Title"
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <AppFormField
                name="dateOfBirth"
                control={control}
                label="Date of Birth"
                type="date"
              />
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
              <AppFormField
                name="nationality"
                control={control}
                label="Nationality"
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <AppFormField
                name="photoUrl"
                control={control}
                label="Photo URL"
                type="url"
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
};

export default PersonalDetails;
