import React from "react";
import {
  Paper,
  type PaperProps,
} from "@mui/material";

interface Props
  extends PaperProps {
  children: React.ReactNode;
}

const AuthCard = ({
  children,
  sx,
  ...rest
}: Props) => {
  return (
    <Paper
      elevation={0}
      sx={{
        width: "100%",
        ...sx,
      }}
      {...rest}
    >
      {children}
    </Paper>
  );
};

export default AuthCard;