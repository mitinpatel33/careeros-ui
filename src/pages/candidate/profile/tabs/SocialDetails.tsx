import { Grid } from "@mui/material";
import { Language } from "@mui/icons-material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  socialSchema,
  type SocialFormType,
} from "../../../../validation/profile.validation";
import AnimatedSectionCard from "../../../../components/common/AnimatedSectionCard";
import SaveFooter from "../../../../layouts/SaveFooter";
import AppTextField from "../../../../components/common/AppTextField";

type Props = {
  defaultValues?: Partial<SocialFormType>;
  loading: boolean;
  isFirst: boolean;
  isLast: boolean;
  onBack: () => void;
  onSubmit: (values: SocialFormType) => Promise<void>;
};

const SocialDetails = ({
  defaultValues,
  loading,
  isFirst,
  isLast,
  onBack,
  onSubmit,
}: Props) => {
  const { control, handleSubmit } = useForm<SocialFormType>({
    resolver: zodResolver(socialSchema),
    mode: "onTouched",
    defaultValues: {
      linkedInUrl: "",
      gitHubUrl: "",
      portfolioUrl: "",
      websiteUrl: "",
      // twitterUrl: "",
      // stackOverflowUrl: "",
      // leetCodeUrl: "",
      ...defaultValues,
    },
  });

  return (
    <AnimatedSectionCard
      title="Social Profiles"
      subtitle="Online profile links"
      icon={<Language />}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2.5}>
          {[
            ["linkedInUrl", "LinkedIn URL"],
            ["gitHubUrl", "GitHub URL"],
            ["portfolioUrl", "Portfolio URL"],
            ["websiteUrl", "Website URL"],
            ["twitterUrl", "Twitter / X URL"],
            ["stackOverflowUrl", "StackOverflow URL"],
            ["leetCodeUrl", "LeetCode URL"],
          ].map(([name, label]) => (
            <Grid key={name} size={{ xs: 12, md: 6 }}>
              <AppTextField<SocialFormType>
                name={name as keyof SocialFormType}
                control={control}
                label={label}
              />
            </Grid>
          ))}
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

export default SocialDetails;
