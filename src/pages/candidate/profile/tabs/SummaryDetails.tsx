import { Grid, Typography } from "@mui/material";
import { Description } from "@mui/icons-material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { memo } from "react";

import AnimatedSectionCard from "../../../../components/common/AnimatedSectionCard";
import SaveFooter from "../../../../layouts/SaveFooter";
import AiAssistField from "../ai/AiAssistField";
import {
  useEnhanceDescriptionMutation,
  useGenerateSummaryMutation,
} from "../../../../services/aiApi";

const summarySchema = z
  .object({
    professionalSummary: z.string().optional(),
    careerObjective: z.string().optional(),
  })
  .refine((data) => data.professionalSummary || data.careerObjective, {
    message:
      "At least one of Professional Summary or Career Objective is required",
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
  /** Optional extra resume context (job title, skills, experience) to personalize AI output */
  aiContext?: Record<string, unknown>;
};

const SummaryDetails = memo(
  ({
    defaultValues,
    loading,
    isFirst,
    isLast,
    onBack,
    onSubmit,
    aiContext,
  }: Props) => {
    const { control, handleSubmit, setValue, watch } = useForm<SummaryFormType>(
      {
        resolver: zodResolver(summarySchema),
        mode: "onTouched",
        defaultValues: {
          professionalSummary: "",
          careerObjective: "",
          ...defaultValues,
        },
      },
    );

    // Payload transformers for the specific endpoints
    const generatePayload = () => {
      const { jobTitle, skills, experience } = aiContext || {};
      return {
        jobTitle: jobTitle || "Software Developer",
        skills: skills || [],
        experience: experience || [],
      };
    };

    const enhancePayload = (params: {
      currentText: string;
      tone?: string;
      fieldType: string;
      context?: Record<string, unknown>;
    }) => ({
      text: params.currentText,
      tone: params.tone,
      fieldType: params.fieldType,
      context: { ...aiContext, ...params.context },
    });

    const summaryResponseTransformer = (response: any) =>
      response?.data?.professionalSummary ??
      response?.professionalSummary ??
      "";

    const objectiveResponseTransformer = (response: any) =>
      response?.data?.careerObjective ?? response?.careerObjective ?? "";

    return (
      <AnimatedSectionCard
        title="Professional Summary"
        subtitle="Write your career intro and objective"
        icon={<Description />}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2.5}>
            <Grid size={{ xs: 12 }}>
              <AiAssistField
                name="professionalSummary"
                control={control}
                setValue={setValue}
                watch={watch}
                label="Professional Summary"
                rows={5}
                generateMutationHook={useGenerateSummaryMutation}
                enhanceMutationHook={useEnhanceDescriptionMutation}
                generatePayload={generatePayload}
                enhancePayload={enhancePayload}
                generateLabel="Generate summary"
                responseTransformer={summaryResponseTransformer} // <-- added
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <AiAssistField
                name="careerObjective"
                control={control}
                setValue={setValue}
                watch={watch}
                label="Career Objective"
                rows={4}
                generateMutationHook={useGenerateSummaryMutation}
                enhanceMutationHook={useEnhanceDescriptionMutation}
                generatePayload={generatePayload}
                enhancePayload={enhancePayload}
                generateLabel="Generate objective"
                responseTransformer={objectiveResponseTransformer} // <-- added
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <Typography variant="caption" color="textSecondary">
                At least one of the two fields must be filled.
              </Typography>
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
  },
);

SummaryDetails.displayName = "SummaryDetails";
export default SummaryDetails;
