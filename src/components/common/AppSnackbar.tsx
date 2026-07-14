import { Alert, Snackbar } from "@mui/material";

type Props = {
  successMessage: string;
  errorMessage: string;
  onCloseSuccess: () => void;
  onCloseError: () => void;
};

const AppSnackbar = ({
  successMessage,
  errorMessage,
  onCloseSuccess,
  onCloseError,
}: Props) => {
  return (
    <>
      <Snackbar
        open={!!successMessage}
        autoHideDuration={1800}
        onClose={onCloseSuccess}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert severity="success" variant="filled">
          {successMessage}
        </Alert>
      </Snackbar>

      <Snackbar
        open={!!errorMessage}
        autoHideDuration={2500}
        onClose={onCloseError}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert severity="error" variant="filled">
          {errorMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default AppSnackbar;