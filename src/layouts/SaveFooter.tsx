import { Box, Button } from "@mui/material";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { motion } from "framer-motion";
import AppButton from "../components/common/AppButton";

type Props = {
  isFirst: boolean;
  isLast: boolean;
  loading: boolean;
  publishing?: boolean;
  onBack: () => void;
};

const SaveFooter = ({ isFirst, isLast, loading, publishing, onBack }: Props) => {
  return (
    <Box
      sx={{
        p: 3,
        borderTop: "1px solid #eee",
        display: "flex",
        gap: 2,
        justifyContent: "space-between",
        bgcolor: "linear-gradient(180deg,#fff,#fafcff)",
      }}
    >
      <Button
        type="button"
        variant="outlined"
        startIcon={<ArrowBack />}
        disabled={isFirst || loading || publishing}
        onClick={onBack}
        sx={{
          height: 50,
          borderRadius: 3,
          textTransform: "none",
          px: 3,
          fontWeight: 800,
        }}
      >
        Back
      </Button>

      <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.96 }}>
        <AppButton
          type="submit"
          loading={loading || publishing}
          color={isLast ? "success" : "primary"}
          endIcon={!isLast ? <ArrowForward /> : undefined}
        >
          {isLast ? "Finish & Publish" : "Save & Continue"}
        </AppButton>
      </motion.div>
    </Box>
  );
};

export default SaveFooter;