import {
  Alert,
  Box,
  Button,
  Chip,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

import { CreditCard, WorkspacePremium } from "@mui/icons-material";

const plans = [
  {
    name: "Starter",
    price: "₹999/month",
    features: ["5 recruiters", "20 jobs", "Basic email templates"],
  },
  {
    name: "Growth",
    price: "₹2999/month",
    features: ["25 recruiters", "Unlimited jobs", "AI matching", "Reports"],
  },
  {
    name: "Enterprise",
    price: "Custom",
    features: ["Custom users", "Dedicated support", "Advanced AI", "API access"],
  },
];

const BillingSettingsTab = () => {
  return (
    <Stack spacing={3}>
      <Alert severity="info">
        Manage subscription, invoices and payment method.
      </Alert>

      <Grid container spacing={2.5}>
        {plans.map((plan) => (
          <Grid key={plan.name} size={{ xs: 12, md: 4 }}>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                height: "100%",
                borderRadius: 5,
                border:
                  plan.name === "Growth"
                    ? "2px solid #2563eb"
                    : "1px solid #e5e7eb",
              }}
            >
              <Stack spacing={2}>
                <Stack direction="row" sx={{ justifyContent: "space-between" }}>
                  <Typography variant="h6" sx={{ fontWeight: 900 }}>
                    {plan.name}
                  </Typography>

                  {plan.name === "Growth" && (
                    <Chip label="Current" color="primary" />
                  )}
                </Stack>

                <Typography variant="h5" sx={{ fontWeight: 900 }}>
                  {plan.price}
                </Typography>

                <Stack spacing={1}>
                  {plan.features.map((feature) => (
                    <Typography key={feature} color="text.secondary">
                      • {feature}
                    </Typography>
                  ))}
                </Stack>

                <Button
                  variant={plan.name === "Growth" ? "contained" : "outlined"}
                  startIcon={<WorkspacePremium />}
                  sx={{ borderRadius: 3 }}
                >
                  {plan.name === "Growth" ? "Current Plan" : "Upgrade"}
                </Button>
              </Stack>
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Box>
        <Button variant="outlined" startIcon={<CreditCard />} sx={{ borderRadius: 3 }}>
          Manage Payment Method
        </Button>
      </Box>
    </Stack>
  );
};

export default BillingSettingsTab;