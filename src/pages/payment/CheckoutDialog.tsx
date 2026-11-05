import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  IconButton,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import ErrorRoundedIcon from "@mui/icons-material/ErrorRounded";
import LockRoundedIcon from "@mui/icons-material/LockRounded";
import { TIER_THEME, glass } from "./glass";
import { formatINR, type Billing, type Plan } from "../../types/plans";
import type { PayStatus } from "../../hooks/usePayment";

interface Props {
  open: boolean;
  plan: Plan | null;
  billing: Billing;
  status: PayStatus;
  error?: string;
  expiresAt?: string;
  onPay: () => void;
  onClose: () => void;
}

const Row = ({
  label,
  value,
  bold,
}: {
  label: string;
  value: string;
  bold?: boolean;
}) => (
  <Stack direction="row" sx={{ justifyContent: "space-between", py: 0.8 }}>
    <Typography
      sx={{ fontSize: 14, color: "#475569", fontFamily: glass.fontFamily }}
    >
      {label}
    </Typography>
    <Typography
      sx={{
        fontSize: bold ? 18 : 14,
        fontWeight: bold ? 800 : 600,
        color: "#0f172a",
        fontFamily: glass.fontFamily,
      }}
    >
      {value}
    </Typography>
  </Stack>
);

const CheckoutDialog = ({
  open,
  plan,
  billing,
  status,
  error,
  expiresAt,
  onPay,
  onClose,
}: Props) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  if (!plan) return null;

  const t = TIER_THEME[plan.id];
  const busy =
    status === "creating" || status === "checkout" || status === "verifying";
  const success = status === "success";
  const failed = status === "failed";
  const label =
    status === "creating"
      ? "Preparing secure checkout…"
      : status === "checkout"
        ? "Complete payment in the Razorpay window…"
        : "Confirming your payment…";

  return (
    <Dialog
      open={open}
      onClose={busy ? undefined : onClose}
      fullScreen={fullScreen}
      fullWidth
      maxWidth="xs"
      slotProps={{
        paper: {
          sx: {
            borderRadius: fullScreen ? 0 : "24px",
            overflow: "hidden",
            backdropFilter: glass.backdropFilter,
            bgcolor: "rgba(255,255,255,.92)",
          },
        },
      }}
    >
      <Box
        sx={{
          background: t.gradient,
          color: "#fff",
          p: { xs: 2.5, sm: 3 },
          pt: { xs: "max(20px, env(safe-area-inset-top))", sm: 3 },
          position: "relative",
        }}
      >
        {!busy && (
          <IconButton
            onClick={onClose}
            aria-label="Close"
            sx={{ position: "absolute", right: 8, top: 8, color: "#fff" }}
          >
            <CloseRoundedIcon />
          </IconButton>
        )}
        <Typography
          sx={{
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: 1.4,
            textTransform: "uppercase",
            opacity: 0.85,
            fontFamily: glass.fontFamily,
          }}
        >
          {success ? "Payment successful" : "Checkout"}
        </Typography>
        <Typography
          sx={{ fontSize: 26, fontWeight: 800, fontFamily: glass.fontFamily }}
        >
          Career OS {plan.name}
        </Typography>
      </Box>

      <Box
        sx={{
          p: { xs: 2.5, sm: 3 },
          flex: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {success ? (
          <Stack
            spacing={1.5}
            sx={{
              alignItems: "center",
              textAlign: "center",
              py: 3,
              flex: 1,
              justifyContent: "center",
            }}
          >
            <CheckCircleRoundedIcon sx={{ fontSize: 72, color: "#16a34a" }} />
            <Typography
              sx={{
                fontSize: 20,
                fontWeight: 800,
                color: "#0f172a",
                fontFamily: glass.fontFamily,
              }}
            >
              You&apos;re on {plan.name}!
            </Typography>
            <Typography
              sx={{
                color: "#475569",
                fontSize: 14,
                fontFamily: glass.fontFamily,
              }}
            >
              {expiresAt
                ? `Active until ${new Date(expiresAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}.`
                : "Your plan is now active."}{" "}
              All {plan.name} templates are unlocked.
            </Typography>
            <Button
              variant="contained"
              onClick={onClose}
              sx={{
                mt: 1,
                borderRadius: "12px",
                textTransform: "none",
                fontWeight: 700,
                px: 4,
                background: t.gradient,
              }}
            >
              Continue
            </Button>
          </Stack>
        ) : (
          <>
            <Box sx={{ bgcolor: t.soft, borderRadius: "16px", p: 2, mb: 2 }}>
              <Row label="Plan" value={plan.name} />
              <Row
                label="Billing"
                value={billing === "yearly" ? "Yearly" : "Monthly"}
              />
              <Box
                sx={{ borderTop: "1px dashed rgba(100,116,139,.4)", my: 0.8 }}
              />
              <Row
                label="Total (incl. taxes)"
                value={formatINR(plan.price[billing])}
                bold
              />
            </Box>

            {failed && (
              <Stack
                direction="row"
                spacing={1}
                sx={{
                  bgcolor: "#fef2f2",
                  color: "#b91c1c",
                  p: 1.5,
                  borderRadius: "12px",
                  mb: 2,
                  alignItems: "flex-start",
                }}
              >
                <ErrorRoundedIcon fontSize="small" />
                <Typography sx={{ fontSize: 13, fontFamily: glass.fontFamily }}>
                  {error || "Payment failed. You have not been charged."}
                </Typography>
              </Stack>
            )}
            {status === "cancelled" && (
              <Typography
                sx={{
                  fontSize: 13,
                  color: "#64748b",
                  mb: 2,
                  fontFamily: glass.fontFamily,
                }}
              >
                Payment window closed. No charge was made.
              </Typography>
            )}

            <Box sx={{ flex: 1 }} />

            <Button
              fullWidth
              variant="contained"
              size="large"
              disabled={busy}
              onClick={onPay}
              startIcon={
                busy ? (
                  <CircularProgress size={18} color="inherit" />
                ) : (
                  <LockRoundedIcon />
                )
              }
              sx={{
                borderRadius: "14px",
                textTransform: "none",
                fontWeight: 800,
                py: 1.4,
                background: t.gradient,
                boxShadow: `0 8px 20px ${t.soft}`,
              }}
            >
              {busy
                ? label
                : failed || status === "cancelled"
                  ? `Retry · ${formatINR(plan.price[billing])}`
                  : `Pay ${formatINR(plan.price[billing])}`}
            </Button>
            <Typography
              sx={{
                fontSize: 11.5,
                color: "#64748b",
                textAlign: "center",
                mt: 1.5,
                fontFamily: glass.fontFamily,
              }}
            >
              Secured by Razorpay · UPI · Cards · Netbanking · Wallets
            </Typography>
          </>
        )}
      </Box>
    </Dialog>
  );
};

export default CheckoutDialog;
