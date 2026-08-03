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
import type { ReactNode } from "react";
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
  disabled?: boolean;
  onValueChange?: (value: unknown) => void;
  endAdornment?: ReactNode;
};

const AppFormField = <T extends FieldValues>({
  name,
  control,
  label,
  type = "text",
  options = [],
  rows = 3,
  disabled = false,
  onValueChange,
  endAdornment,
}: Props<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        const error = !!fieldState.error;
        const helperText = fieldState.error?.message;

        const handleChange = (value: unknown) => {
          field.onChange(value);
          onValueChange?.(value);
        };

        if (type === "checkbox") {
          return (
            <FormControl error={error} disabled={disabled}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={!!field.value}
                    disabled={disabled}
                    onChange={(e) => handleChange(e.target.checked)}
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
            <FormControl error={error} disabled={disabled}>
              <FormLabel>{label}</FormLabel>
              <RadioGroup
                row
                value={field.value ?? ""}
                onChange={(e) => handleChange(e.target.value)}
              >
                {options.map((x) => (
                  <FormControlLabel
                    key={String(x.value)}
                    value={x.value}
                    control={<Radio />}
                    disabled={disabled}
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
            onChange={(e) => handleChange(e.target.value)}
            fullWidth
            label={label}
            type={type === "textarea" ? "text" : type}
            select={type === "select"}
            multiline={type === "textarea"}
            rows={type === "textarea" ? rows : undefined}
            error={error}
            helperText={helperText}
            disabled={disabled}
            slotProps={{
              inputLabel: type === "date" ? { shrink: true } : undefined,
              input: endAdornment ? { endAdornment } : undefined,
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