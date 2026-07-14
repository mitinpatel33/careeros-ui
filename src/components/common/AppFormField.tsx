import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  MenuItem,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import {
  Controller,
  type Control,
  type FieldValues,
  type Path,
} from "react-hook-form";

type Option = {
  label: string;
  value: string | boolean;
};

type Props<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  label: string;
  type?:
    | "text"
    | "number"
    | "date"
    | "select"
    | "radio"
    | "checkbox"
    | "textarea"
    | "url"
    | "email";
  options?: Option[];
  rows?: number;
};

const AppFormField = <T extends FieldValues>({
  name,
  control,
  label,
  type = "text",
  options = [],
  rows = 3,
}: Props<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        const error = !!fieldState.error;
        const helperText = fieldState.error?.message;

        if (type === "checkbox") {
          return (
            <FormControl error={error}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={!!field.value}
                    onChange={(e) => field.onChange(e.target.checked)}
                  />
                }
                label={label}
              />
              {helperText && <FormHelperText>{helperText}</FormHelperText>}
            </FormControl>
          );
        }

        if (type === "radio") {
          return (
            <FormControl error={error}>
              <FormLabel>{label}</FormLabel>
              <RadioGroup
                row
                value={field.value ?? ""}
                onChange={(e) => field.onChange(e.target.value)}
              >
                {options.map((x) => (
                  <FormControlLabel
                    key={String(x.value)}
                    value={x.value}
                    control={<Radio />}
                    label={x.label}
                  />
                ))}
              </RadioGroup>
              {helperText && <FormHelperText>{helperText}</FormHelperText>}
            </FormControl>
          );
        }

        return (
          <TextField
            {...field}
            fullWidth
            label={label}
            type={type === "textarea" ? "text" : type}
            select={type === "select"}
            multiline={type === "textarea"}
            rows={type === "textarea" ? rows : undefined}
            error={error}
            helperText={helperText}
            slotProps={{
              inputLabel: type === "date" ? { shrink: true } : undefined,
            }}
            value={field.value ?? ""}
          >
            {options.map((x) => (
              <MenuItem key={String(x.value)} value={String(x.value)}>
                {x.label}
              </MenuItem>
            ))}
          </TextField>
        );
      }}
    />
  );
};

export default AppFormField;
