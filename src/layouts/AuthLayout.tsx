import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import { styled, keyframes } from "@mui/material/styles";

// ─── Keyframes ──────────────────────────────────────────

// Floating motion for decorative shapes
const float = keyframes`
  0% { transform: translateY(0) rotate(0deg) scale(1); opacity: 0.3; }
  50% { transform: translateY(-30px) rotate(8deg) scale(1.1); opacity: 0.6; }
  100% { transform: translateY(0) rotate(0deg) scale(1); opacity: 0.3; }
`;

// Animated gradient (shifts background position)
const moveGradient = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

// ─── Styled Components ──────────────────────────────────

// Main container – animated gradient
const AnimatedBox = styled(Box)({
  minHeight: "100vh",
  background: "linear-gradient(135deg, #667eea, #764ba2)",
  backgroundSize: "400% 400%",
  animation: `${moveGradient} 12s ease infinite`,
  position: "relative",
  overflow: "hidden",
});

// Decorative floating shape
const Shape = styled(Box)<{
  size: string;
  top: string;
  left: string;
  delay: string;
  duration: number;
}>(({ size, top, left, delay, duration }) => ({
  position: "absolute",
  borderRadius: "50%",
  background: "rgba(255, 255, 255, 0.08)",
  backdropFilter: "blur(6px)",
  border: "1px solid rgba(255, 255, 255, 0.12)",
  width: size,
  height: size,
  top,
  left,
  animation: `${float} ${duration}s ease-in-out infinite`,
  animationDelay: delay,
  pointerEvents: "none", // allow clicks to pass through
}));

// ─── Component ──────────────────────────────────────────

const AuthLayout = () => {
  return (
    <AnimatedBox>
      {/* Floating shapes – adjust positions/sizes as you like */}
      <Shape size="200px" top="8%" left="3%" delay="0s" duration={6} />
      <Shape size="150px" top="65%" left="85%" delay="2s" duration={8} />
      <Shape size="120px" top="25%" left="75%" delay="4s" duration={5} />
      <Shape size="180px" top="75%" left="8%" delay="1s" duration={7} />
      <Shape size="100px" top="15%" left="55%" delay="3s" duration={9} />
      <Shape size="140px" top="45%" left="45%" delay="5s" duration={6.5} />

      {/* Your page content (login/signup forms) */}
      <Outlet />
    </AnimatedBox>
  );
};

export default AuthLayout;