import { useState } from "react";
import { type Control, type FieldValues, type Path } from "react-hook-form";
import { IconButton, InputAdornment, type TextFieldProps } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import AppTextField from "./AppTextField";

interface PasswordFieldProps<T extends FieldValues> extends Omit<
  TextFieldProps,
  "name"
> {
  name: Path<T>;
  control: Control<T>;
}

const PasswordField = <T extends FieldValues>({
  name,
  control,
  ...props
}: PasswordFieldProps<T>) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <AppTextField<T>
      {...props}
      name={name}
      control={control}
      type={showPassword ? "text" : "password"}
      slotProps={{
        input: {
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                edge="end"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        },
      }}
    />
  );
};

export default PasswordField;
