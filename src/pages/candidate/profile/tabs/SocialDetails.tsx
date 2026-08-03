import { Grid } from "@mui/material";
import { Share } from "@mui/icons-material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { memo } from "react";

import AnimatedSectionCard from "../../../../components/common/AnimatedSectionCard";
import AppTextField from "../../../../components/common/AppTextField";
import SaveFooter from "../../../../layouts/SaveFooter";

const socialSchema = z.object({
  linkedInUrl: z.string().url().optional().or(z.literal("")),
  gitHubUrl: z.string().url().optional().or(z.literal("")),
  portfolioUrl: z.string().url().optional().or(z.literal("")),
  websiteUrl: z.string().url().optional().or(z.literal("")),
});

export type SocialFormType = z.infer<typeof socialSchema>;

type Props = {
  defaultValues?: Partial<SocialFormType>;
  loading: boolean;
  isFirst: boolean;
  isLast: boolean;
  onBack: () => void;
  onSubmit: (values: SocialFormType) => Promise<void>;
};

const SocialDetails = memo(({ defaultValues, loading, isFirst, isLast, onBack, onSubmit }: Props) => {
  const { control, handleSubmit } = useForm<SocialFormType>({
    resolver: zodResolver(socialSchema),
    defaultValues: { linkedInUrl: "", gitHubUrl: "", portfolioUrl: "", websiteUrl: "", ...defaultValues },
  });

  return (
    <AnimatedSectionCard title="Social Profiles" subtitle="Link your online presence" icon={<Share />}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2.5}>
          <Grid size={{ xs: 12, md: 6 }}>
            <AppTextField name="linkedInUrl" control={control} label="LinkedIn URL" type="url" />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <AppTextField name="gitHubUrl" control={control} label="GitHub URL" type="url" />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <AppTextField name="portfolioUrl" control={control} label="Portfolio URL" type="url" />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <AppTextField name="websiteUrl" control={control} label="Website URL" type="url" />
          </Grid>
        </Grid>
        <SaveFooter isFirst={isFirst} isLast={isLast} loading={loading} onBack={onBack} />
      </form>
    </AnimatedSectionCard>
  );
});

SocialDetails.displayName = "SocialDetails";
export default SocialDetails;