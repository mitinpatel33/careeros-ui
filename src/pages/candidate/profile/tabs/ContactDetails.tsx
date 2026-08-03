import { Grid } from "@mui/material";
import { ContactMail } from "@mui/icons-material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { memo } from "react";

import AnimatedSectionCard from "../../../../components/common/AnimatedSectionCard";
import AppTextField from "../../../../components/common/AppTextField";
import SaveFooter from "../../../../layouts/SaveFooter";

const contactSchema = z.object({
  email: z.string().email("Invalid email").min(1, "Email is required"),
  mobile: z.string().min(1, "Mobile is required"),
  alternateMobile: z.string().optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  country: z.string().optional(),
  pincode: z.string().optional(),
});

export type ContactFormType = z.infer<typeof contactSchema>;

type Props = {
  defaultValues?: Partial<ContactFormType>;
  loading: boolean;
  isFirst: boolean;
  isLast: boolean;
  onBack: () => void;
  onSubmit: (values: ContactFormType) => Promise<void>;
};

const ContactDetails = memo(({ defaultValues, loading, isFirst, isLast, onBack, onSubmit }: Props) => {
  const { control, handleSubmit } = useForm<ContactFormType>({
    resolver: zodResolver(contactSchema),
    mode: "onTouched",
    defaultValues: { email: "", mobile: "", alternateMobile: "", address: "", city: "", state: "", country: "", pincode: "", ...defaultValues },
  });

  return (
    <AnimatedSectionCard title="Contact Information" subtitle="Email, mobile and address details" icon={<ContactMail />}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2.5}>
          <Grid size={{ xs: 12, md: 6 }}>
            <AppTextField name="email" control={control} label="Email *" />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <AppTextField name="mobile" control={control} label="Mobile *" />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <AppTextField name="alternateMobile" control={control} label="Alternate Mobile" />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <AppTextField name="city" control={control} label="City" />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <AppTextField name="state" control={control} label="State" />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <AppTextField name="country" control={control} label="Country" />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <AppTextField name="pincode" control={control} label="Pincode" />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <AppTextField name="address" control={control} label="Address" multiline rows={4} />
          </Grid>
        </Grid>
        <SaveFooter isFirst={isFirst} isLast={isLast} loading={loading} onBack={onBack} />
      </form>
    </AnimatedSectionCard>
  );
});

ContactDetails.displayName = "ContactDetails";
export default ContactDetails;