import { Box, useTheme, useMediaQuery } from "@mui/material";
import { motion } from "framer-motion";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import CodeRoundedIcon from "@mui/icons-material/CodeRounded";
import WorkOutlineRoundedIcon from "@mui/icons-material/WorkOutlineRounded";
import AccountBoxOutlinedIcon from "@mui/icons-material/AccountBoxOutlined";

const NETWORK_NODES = [
  { id: 0, x: 5, y: 38 },
  { id: 1, x: 15, y: 15 },
  { id: 2, x: 18, y: 48 },
  { id: 3, x: 26, y: 28 },
  { id: 4, x: 28, y: 68 },
  { id: 5, x: 38, y: 88 },
  { id: 6, x: 62, y: 85 },
  { id: 7, x: 72, y: 65 },
  { id: 8, x: 75, y: 25 },
  { id: 9, x: 82, y: 52 },
  { id: 10, x: 86, y: 12 },
  { id: 11, x: 94, y: 42 },
];

const NETWORK_EDGES = [
  [0, 1],
  [0, 2],
  [1, 2],
  [1, 3],
  [2, 3],
  [2, 4],
  [3, 4],
  [4, 5],
  [6, 7],
  [7, 8],
  [7, 9],
  [8, 9],
  [8, 10],
  [9, 11],
  [10, 11],
];

const ICON_COLORS = ["#a855f7", "#8b5cf6", "#6366f1", "#3b82f6", "#06b6d4"];

const FLOATING_ICONS = Array.from({ length: 24 }).map((_, i) => ({
  id: i,
  x: (i * 4.2 + Math.random() * 3) % 96,
  startY: 105 + Math.random() * 10,
  duration: 11 + Math.random() * 8,
  delay: Math.random() * 8,
  color: ICON_COLORS[i % ICON_COLORS.length],
  type:
    i % 4 === 0
      ? "code"
      : i % 3 === 0
        ? "briefcase"
        : i % 5 === 0
          ? "profile"
          : "doc",
  size: 20 + (i % 3) * 4,
}));

const ConnectedConstellationBg = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // Reduce rendered icon count on mobile for smooth performance
  const activeIcons = isMobile ? FLOATING_ICONS.slice(0, 10) : FLOATING_ICONS;

  const renderIcon = (type: string, color: string, size: number) => {
    const iconSize = isMobile ? size * 0.75 : size;
    const iconProps = { sx: { fontSize: iconSize, color } };
    switch (type) {
      case "code":
        return <CodeRoundedIcon {...iconProps} />;
      case "briefcase":
        return <WorkOutlineRoundedIcon {...iconProps} />;
      case "profile":
        return <AccountBoxOutlinedIcon {...iconProps} />;
      default:
        return <DescriptionOutlinedIcon {...iconProps} />;
    }
  };

  return (
    <Box
      sx={{
        position: "fixed",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
        zIndex: 1,
      }}
    >
      {/* Background Glows */}
      <Box
        sx={{
          position: "absolute",
          top: "5%",
          left: "5%",
          width: { xs: "80vw", md: "50vw" },
          height: { xs: "40vh", md: "50vh" },
          background:
            "radial-gradient(ellipse at center, rgba(192, 132, 252, 0.25) 0%, transparent 70%)",
          filter: { xs: "blur(50px)", md: "blur(90px)" },
        }}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: "5%",
          right: "5%",
          width: { xs: "80vw", md: "50vw" },
          height: { xs: "40vh", md: "50vh" },
          background:
            "radial-gradient(ellipse at center, rgba(147, 197, 253, 0.35) 0%, transparent 70%)",
          filter: { xs: "blur(50px)", md: "blur(90px)" },
        }}
      />

      {/* SVG Network Lines */}
      <Box
        component="svg"
        sx={{ position: "absolute", width: "100%", height: "100%" }}
      >
        {NETWORK_EDGES.map(([startIdx, endIdx], i) => {
          const start = NETWORK_NODES[startIdx];
          const end = NETWORK_NODES[endIdx];

          return (
            <line
              key={`edge-${i}`}
              x1={`${start.x}%`}
              y1={`${start.y}%`}
              x2={`${end.x}%`}
              y2={`${end.y}%`}
              stroke="rgba(168, 85, 247, 0.25)"
              strokeWidth={1.5}
            />
          );
        })}
      </Box>

      {/* Travelling Pulses */}
      {NETWORK_EDGES.map(([startIdx, endIdx], i) => {
        const start = NETWORK_NODES[startIdx];
        const end = NETWORK_NODES[endIdx];

        return (
          <Box
            key={`led-pulse-${i}`}
            component={motion.div}
            animate={{
              left: [`${start.x}%`, `${end.x}%`],
              top: [`${start.y}%`, `${end.y}%`],
              opacity: [0, 1, 1, 0],
            }}
            transition={{
              duration: 2.5 + (i % 3) * 0.8,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
              delay: (i % 5) * 0.6,
            }}
            sx={{
              position: "absolute",
              width: { xs: 6, sm: 10 },
              height: { xs: 6, sm: 10 },
              ml: { xs: "-3px", sm: "-5px" },
              mt: { xs: "-3px", sm: "-5px" },
              borderRadius: "50%",
              background:
                "radial-gradient(circle, #ffffff 0%, #a855f7 60%, #6366f1 100%)",
              boxShadow:
                "0 0 10px #c084fc, 0 0 18px #818cf8, 0 0 25px rgba(168, 85, 247, 0.8)",
            }}
          />
        );
      })}

      {/* Glowing Nodes */}
      {NETWORK_NODES.map((node) => (
        <Box
          key={`node-${node.id}`}
          component={motion.div}
          animate={{ scale: [1, 1.4, 1] }}
          transition={{
            duration: 2.5 + (node.id % 3),
            repeat: Infinity,
            ease: "easeInOut",
          }}
          sx={{
            position: "absolute",
            left: `${node.x}%`,
            top: `${node.y}%`,
            width: { xs: 6, sm: 9 },
            height: { xs: 6, sm: 9 },
            ml: { xs: "-3px", sm: "-4.5px" },
            mt: { xs: "-3px", sm: "-4.5px" },
            borderRadius: "50%",
            bgcolor: node.id % 2 === 0 ? "#c084fc" : "#818cf8",
          }}
        />
      ))}

      {/* Floating Badges */}
      {activeIcons.map((item) => (
        <Box
          key={`float-${item.id}`}
          component={motion.div}
          animate={{
            y: ["0vh", "-115vh"],
            opacity: [0, 0.85, 0.85, 0],
            rotate: [0, item.id % 2 === 0 ? 12 : -12, 0],
          }}
          transition={{
            duration: item.duration,
            repeat: Infinity,
            delay: item.delay,
            ease: "linear",
          }}
          sx={{
            position: "absolute",
            left: `${item.x}%`,
            top: `${item.startY}%`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            p: { xs: 0.5, sm: 0.9 },
            borderRadius: { xs: "8px", sm: "12px" },
            bgcolor: "rgba(255, 255, 255, 0.8)",
            backdropFilter: "blur(8px)",
            border: "1px solid rgba(233, 213, 255, 0.9)",
            boxShadow: "0 6px 16px rgba(192, 132, 252, 0.25)",
          }}
        >
          {renderIcon(item.type, item.color, item.size)}
        </Box>
      ))}
    </Box>
  );
};

export default ConnectedConstellationBg;
