import { Grid } from "@mui/material";
import { Settings } from "@mui/icons-material";
import { useForm } from "react-hook-form";
import AnimatedSectionCard from "../../../../components/common/AnimatedSectionCard";
import AppTextField from "../../../../components/common/AppTextField";
import SaveFooter from "../../../../layouts/SaveFooter";

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

const SettingsDetails = ({
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

  return (
    <AnimatedSectionCard
      title="Profile Settings"
      subtitle="Theme, template and publish options"
      icon={<Settings />}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2.5}>
          <Grid size={{ xs: 12, md: 6 }}>
            <AppTextField<SettingsFormType>
              name="resumeTheme"
              control={control}
              label="Resume Theme"
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <AppTextField<SettingsFormType>
              name="resumeTemplate"
              control={control}
              label="Resume Template"
            />
          </Grid>
        </Grid>

        <SaveFooter
          isFirst={isFirst}
          isLast={isLast}
          loading={loading}
          onBack={onBack}
        />
      </form>
    </AnimatedSectionCard>
  );
};

export default SettingsDetails;
