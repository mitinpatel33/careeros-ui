import { Box, Card, Stack, Typography, Avatar } from "@mui/material";
import { motion } from "framer-motion";

type Props = {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  children: React.ReactNode;
};

const AnimatedSectionCard = ({ title, subtitle, icon, children }: Props) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 35, scale: 0.98 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      transition={{ duration: 0.35, type: "spring" }}
    >
      <Card
        sx={{
          borderRadius: 5,
          overflow: "hidden",
          boxShadow: "0 22px 70px rgba(31,81,255,.14)",
          border: "1px solid rgba(255,255,255,.8)",
        }}
      >
        <Box sx={{ p: 3, borderBottom: "1px solid #eee" }}>
          <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
            <Avatar
              sx={{
                bgcolor: "primary.main",
                width: 48,
                height: 48,
                boxShadow: "0 12px 30px rgba(25,118,210,.3)",
              }}
            >
              {icon}
            </Avatar>

            <Box>
              <Typography variant="h5" sx={{ fontWeight: 900 }}>
                {title}
              </Typography>
              <Typography color="text.secondary">{subtitle}</Typography>
            </Box>
          </Stack>
        </Box>

        <Box sx={{ p: { xs: 2.5, md: 4 } }}>{children}</Box>
      </Card>
    </motion.div>
  );
};

export default AnimatedSectionCard;