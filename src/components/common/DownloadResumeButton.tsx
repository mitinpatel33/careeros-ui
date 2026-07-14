import { Button } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";

const DownloadResumeButton = () => {
  return (
    <Button
      variant="contained"
      startIcon={<DownloadIcon />}
      onClick={() => window.print()}
      sx={{ borderRadius: 3, fontWeight: 800 }}
    >
      Download PDF
    </Button>
  );
};

export default DownloadResumeButton;
