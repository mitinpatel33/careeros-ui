import { Grid, Typography } from "@mui/material";
import { Description } from "@mui/icons-material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { memo } from "react";

import AnimatedSectionCard from "../../../../components/common/AnimatedSectionCard";
import AppTextField from "../../../../components/common/AppTextField";
import SaveFooter from "../../../../layouts/SaveFooter";

const summarySchema = z
  .object({
    professionalSummary: z.string().optional(),
    careerObjective: z.string().optional(),
  })
  .refine((data) => data.professionalSummary || data.careerObjective, {
    message: "At least one of Professional Summary or Career Objective is required",
    path: ["professionalSummary"],
  });

export type SummaryFormType = z.infer<typeof summarySchema>;

type Props = {
  defaultValues?: Partial<SummaryFormType>;
  loading: boolean;
  isFirst: boolean;
  isLast: boolean;
  onBack: () => void;
  onSubmit: (values: SummaryFormType) => Promise<void>;
};

const SummaryDetails = memo(({ defaultValues, loading, isFirst, isLast, onBack, onSubmit }: Props) => {
  const { control, handleSubmit } = useForm<SummaryFormType>({
    resolver: zodResolver(summarySchema),
    mode: "onTouched",
    defaultValues: { professionalSummary: "", careerObjective: "", ...defaultValues },
  });

  return (
    <AnimatedSectionCard title="Professional Summary" subtitle="Write your career intro and objective" icon={<Description />}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2.5}>
          <Grid size={{ xs: 12 }}>
            <AppTextField name="professionalSummary" control={control} label="Professional Summary" multiline rows={5} />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <AppTextField name="careerObjective" control={control} label="Career Objective" multiline rows={4} />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <Typography variant="caption" color="textSecondary">
              At least one of the two fields must be filled.
            </Typography>
          </Grid>
        </Grid>
        <SaveFooter isFirst={isFirst} isLast={isLast} loading={loading} onBack={onBack} />
      </form>
    </AnimatedSectionCard>
  );
});

SummaryDetails.displayName = "SummaryDetails";
export default SummaryDetails;