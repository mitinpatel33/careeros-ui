import { Grid } from "@mui/material";
import { Description } from "@mui/icons-material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import AnimatedSectionCard from "../../../../components/common/AnimatedSectionCard";
import AppTextField from "../../../../components/common/AppTextField";
import { summarySchema, type SummaryFormType } from "../../../../validation/profile.validation";
import SaveFooter from "../../../../layouts/SaveFooter";

type Props = {
  defaultValues?: Partial<SummaryFormType>;
  loading: boolean;
  isFirst: boolean;
  isLast: boolean;
  onBack: () => void;
  onSubmit: (values: SummaryFormType) => Promise<void>;
};

const SummaryDetails = ({
  defaultValues,
  loading,
  isFirst,
  isLast,
  onBack,
  onSubmit,
}: Props) => {
  const { control, handleSubmit } = useForm<SummaryFormType>({
    resolver: zodResolver(summarySchema),
    mode: "onTouched",
    defaultValues: {
      professionalSummary: "",
      careerObjective: "",
      ...defaultValues,
    },
  });

  return (
    <AnimatedSectionCard
      title="Professional Summary"
      subtitle="Write your career intro and objective"
      icon={<Description />}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2.5}>
          <Grid size={{ xs: 12 }}>
            <AppTextField<SummaryFormType>
              name="professionalSummary"
              control={control}
              label="Professional Summary"
              multiline
              rows={5}
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <AppTextField<SummaryFormType>
              name="careerObjective"
              control={control}
              label="Career Objective"
              multiline
              rows={4}
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

export default SummaryDetails;