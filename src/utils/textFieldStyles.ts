export const darkTextFieldSx = {
  "& .MuiInputLabel-root": {
    color: "rgba(255, 255, 255, 0.7)",
    "&.Mui-focused": {
      color: "#60a5fa",
    },
  },
  "& .MuiOutlinedInput-root": {
    color: "#fff",
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    borderRadius: "12px",
    transition: "all 0.2s ease-in-out",
    "& fieldset": {
      borderColor: "rgba(255, 255, 255, 0.2)",
    },
    "&:hover fieldset": {
      borderColor: "rgba(255, 255, 255, 0.4)",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#3b82f6",
      borderWidth: "2px",
    },
  },
  "& .MuiFormHelperText-root": {
    color: "#f87171",
  },
};
