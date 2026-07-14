import { TextField, type TextFieldProps } from "@mui/material";
import {
  Controller,
  type Control,
  type FieldValues,
  type Path,
} from "react-hook-form";

type Props<T extends FieldValues> = TextFieldProps & {
  name: Path<T>;
  control: Control<T>;
};

const AppTextField = <T extends FieldValues>({
  name,
  control,
  ...props
}: Props<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <TextField
          {...field}
          {...props}
          fullWidth
          error={!!fieldState.error}
          helperText={fieldState.error?.message}
          slotProps={{
            inputLabel: props.type === "date" ? { shrink: true } : undefined,
            ...props.slotProps,
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: 3,
              bgcolor: "#fff",
            },
            ...props.sx,
          }}
        />
      )}
    />
  );
};

export default AppTextField;