import { Grid } from "@mui/material";
import { ContactMail } from "@mui/icons-material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  contactSchema,
  type ContactFormType,
} from "../../../../validation/profile.validation";
import AnimatedSectionCard from "../../../../components/common/AnimatedSectionCard";
import AppTextField from "../../../../components/common/AppTextField";
import SaveFooter from "../../../../layouts/SaveFooter";

type Props = {
  defaultValues?: Partial<ContactFormType>;
  loading: boolean;
  isFirst: boolean;
  isLast: boolean;
  onBack: () => void;
  onSubmit: (values: ContactFormType) => Promise<void>;
};

const ContactDetails = ({
  defaultValues,
  loading,
  isFirst,
  isLast,
  onBack,
  onSubmit,
}: Props) => {
  const { control, handleSubmit } = useForm<ContactFormType>({
    resolver: zodResolver(contactSchema),
    mode: "onTouched",
    defaultValues: {
      email: "",
      mobile: "",
      alternateMobile: "",
      address: "",
      city: "",
      state: "",
      country: "",
      pincode: "",
      ...defaultValues,
    },
  });

  return (
    <AnimatedSectionCard
      title="Contact Information"
      subtitle="Email, mobile and address details"
      icon={<ContactMail />}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2.5}>
          <Grid size={{ xs: 12, md: 6 }}>
            <AppTextField<ContactFormType>
              name="email"
              control={control}
              label="Email"
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <AppTextField<ContactFormType>
              name="mobile"
              control={control}
              label="Mobile"
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <AppTextField<ContactFormType>
              name="alternateMobile"
              control={control}
              label="Alternate Mobile"
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <AppTextField<ContactFormType>
              name="city"
              control={control}
              label="City"
            />
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <AppTextField<ContactFormType>
              name="state"
              control={control}
              label="State"
            />
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <AppTextField<ContactFormType>
              name="country"
              control={control}
              label="Country"
            />
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <AppTextField<ContactFormType>
              name="pincode"
              control={control}
              label="Pincode"
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <AppTextField<ContactFormType>
              name="address"
              control={control}
              label="Address"
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

export default ContactDetails;
