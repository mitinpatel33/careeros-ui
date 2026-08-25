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
      autoComplete="new-password"
      slotProps={{
        input: {
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                edge="end"
                onClick={() => setShowPassword((prev) => !prev)}
                sx={{
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  bgcolor: "#e0f2fe", // Light soft-blue bubble container
                  color: "#3b82f6",
                  transition: "all 0.2s ease",
                  "&:hover": {
                    bgcolor: "#bae6fd",
                    transform: "scale(1.05)",
                  },
                }}
              >
                {showPassword ? (
                  <VisibilityOff sx={{ fontSize: "1.1rem" }} />
                ) : (
                  <Visibility sx={{ fontSize: "1.1rem" }} />
                )}
              </IconButton>
            </InputAdornment>
          ),
        },
      }}
    />
  );
};

export default PasswordField;
