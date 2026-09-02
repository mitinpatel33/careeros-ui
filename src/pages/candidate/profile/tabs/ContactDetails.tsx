import { memo, useMemo } from "react";
import { Grid, Autocomplete, TextField } from "@mui/material";
import { ContactMail } from "@mui/icons-material";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Country, State, City } from "country-state-city";
import AnimatedSectionCard from "../../../../components/common/AnimatedSectionCard";
import AppFormField from "../../../../components/common/AppFormField";
import SaveFooter from "../../../../layouts/SaveFooter";

const contactSchema = z.object({
  email: z.string().email("Invalid email").min(1, "Email is required"),
  mobile: z.string().min(1, "Mobile is required"),
  alternateMobile: z.string().optional(),
  address: z.string().optional(),
  country: z.string().optional(), // stores country NAME
  state: z.string().optional(),   // stores state NAME
  city: z.string().optional(),    // stores city NAME
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

const ContactDetails = memo(
  ({ defaultValues, loading, isFirst, isLast, onBack, onSubmit }: Props) => {
    const { control, handleSubmit, watch, resetField } =
      useForm<ContactFormType>({
        resolver: zodResolver(contactSchema),
        mode: "onTouched",
        defaultValues: {
          email: "",
          mobile: "",
          alternateMobile: "",
          address: "",
          country: "",
          state: "",
          city: "",
          pincode: "",
          ...defaultValues,
        },
      });

    const selectedCountryName = watch("country");
    const selectedStateName = watch("state");

    // Fetch all countries directly from local package
    const countryOptions = useMemo(() => Country.getAllCountries(), []);

    // Resolve ISO code from stored country NAME
    const selectedCountryIso = useMemo(
      () =>
        countryOptions.find((c) => c.name === selectedCountryName)?.isoCode ??
        "",
      [countryOptions, selectedCountryName]
    );

    // Get states for selected country ISO
    const stateOptions = useMemo(
      () =>
        selectedCountryIso ? State.getStatesOfCountry(selectedCountryIso) : [],
      [selectedCountryIso]
    );

    // Resolve ISO code from stored state NAME
    const selectedStateIso = useMemo(
      () =>
        stateOptions.find((s) => s.name === selectedStateName)?.isoCode ?? "",
      [stateOptions, selectedStateName]
    );

    // Get cities for selected country ISO + state ISO
    const cityOptions = useMemo(
      () =>
        selectedCountryIso && selectedStateIso
          ? City.getCitiesOfState(selectedCountryIso, selectedStateIso)
          : [],
      [selectedCountryIso, selectedStateIso]
    );

    return (
      <AnimatedSectionCard title="Contact Information" subtitle="Email, mobile and address details" icon={<ContactMail />}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2.5}>
            <Grid size={{ xs: 12, md: 6 }}>
              <AppFormField name="email" control={control} label="Email *" type="email" />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <AppFormField name="mobile" control={control} label="Mobile *" />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <AppFormField name="alternateMobile" control={control} label="Alternate Mobile" />
            </Grid>

            {/* Country */}
            <Grid size={{ xs: 12, md: 6 }}>
              <Controller name="country" control={control} render={({ field, fieldState }) => (
                <Autocomplete
                  options={countryOptions}
                  getOptionLabel={(opt) => opt.name}
                  isOptionEqualToValue={(opt, val) => !!val && opt.name === val.name}
                  value={
                    countryOptions.find((c) => c.name === field.value) ?? null
                  }
                  onChange={(_, newValue) => {
                    field.onChange(newValue?.name ?? "");
                    resetField("state", { defaultValue: "" });
                    resetField("city", { defaultValue: "" });
                  }}
                  renderInput={(params) => (
                    <TextField {...params} label="Country" error={!!fieldState.error} helperText={fieldState.error?.message} />
                  )}
                />
              )}
              />
            </Grid>

            {/* State */}
            <Grid size={{ xs: 12, md: 6 }}>
              <Controller name="state" control={control} render={({ field, fieldState }) => (
                <Autocomplete
                  options={stateOptions}
                  disabled={!selectedCountryIso}
                  getOptionLabel={(opt) => opt.name}
                  isOptionEqualToValue={(opt, val) => !!val && opt.name === val.name}
                  value={
                    stateOptions.find((s) => s.name === field.value) ?? null
                  }
                  onChange={(_, newValue) => {
                    field.onChange(newValue?.name ?? "");
                    resetField("city", { defaultValue: "" });
                  }}
                  renderInput={(params) => (
                    <TextField {...params} label="State" error={!!fieldState.error} helperText={fieldState.error?.message} />
                  )}
                />
              )}
              />
            </Grid>

            {/* City */}
            <Grid size={{ xs: 12, md: 6 }}>
              <Controller name="city" control={control} render={({ field, fieldState }) => (
                <Autocomplete
                  options={cityOptions}
                  disabled={!selectedStateIso}
                  getOptionLabel={(opt) => opt.name}
                  isOptionEqualToValue={(opt, val) => !!val && opt.name === val.name}
                  value={
                    cityOptions.find((c) => c.name === field.value) ?? null
                  }
                  onChange={(_, newValue) => {
                    field.onChange(newValue?.name ?? "");
                  }}
                  renderInput={(params) => (
                    <TextField {...params} label="City" error={!!fieldState.error} helperText={fieldState.error?.message} />
                  )}
                />
              )}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <AppFormField name="pincode" control={control} label="Pincode" />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <AppFormField name="address" control={control} label="Address" type="textarea" rows={4} />
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
  }
);

ContactDetails.displayName = "ContactDetails";
export default ContactDetails;