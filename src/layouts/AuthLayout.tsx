import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import { motion } from "framer-motion";

const ConstellationBg = () => {
  const nodes = Array.from({ length: 24 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 2,
    duration: Math.random() * 10 + 10,
    delay: Math.random() * 3,
  }));

  return (
    <Box
      sx={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
        zIndex: 1,
      }}
    >
      {/* Background Radial Glow */}
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "80vw",
          height: "80vh",
          background:
            "radial-gradient(ellipse at center, rgba(59, 130, 246, 0.15) 0%, rgba(139, 92, 246, 0.05) 50%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      {/* Connected Grid Rays */}
      <Box
        component="svg"
        sx={{
          position: "absolute",
          width: "100%",
          height: "100%",
          opacity: 0.2,
        }}
      >
        <line x1="10%" y1="20%" x2="40%" y2="70%" stroke="#60a5fa" strokeWidth="1" strokeDasharray="5,5" />
        <line x1="80%" y1="15%" x2="60%" y2="80%" stroke="#a78bfa" strokeWidth="1" strokeDasharray="5,5" />
        <line x1="30%" y1="85%" x2="70%" y2="25%" stroke="#38bdf8" strokeWidth="1" strokeDasharray="5,5" />
      </Box>

      {/* Floating Nodes */}
      {nodes.map((node) => (
        <Box
          key={node.id}
          component={motion.div}
          animate={{
            x: [0, Math.random() * 40 - 20, 0],
            y: [0, Math.random() * 40 - 20, 0],
            opacity: [0.3, 0.8, 0.3],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: node.duration,
            repeat: Infinity,
            delay: node.delay,
            ease: "easeInOut",
          }}
          sx={{
            position: "absolute",
            left: `${node.x}%`,
            top: `${node.y}%`,
            width: node.size,
            height: node.size,
            borderRadius: "50%",
            bgcolor: node.id % 2 === 0 ? "#60a5fa" : "#c084fc",
            boxShadow:
              node.id % 2 === 0
                ? "0 0 10px #3b82f6, 0 0 20px #3b82f6"
                : "0 0 10px #a855f7, 0 0 20px #a855f7",
          }}
        />
      ))}
    </Box>
  );
};

const AuthLayout = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100%",
        position: "relative",
        overflow: "hidden",
        display: "grid",
        placeItems: "center",
        background: "linear-gradient(135deg, #030712 0%, #0b1120 50%, #170d2b 100%)",
      }}
    >
      <ConstellationBg />

      <Box sx={{ position: "relative", zIndex: 2, width: "100%", display: "grid", placeItems: "center" }}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default AuthLayout;