import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import { getSkillVisual } from "../data";
import { SectionCard, SelectorTile } from "./shared";
import type { SkillDto } from "../../../services/interviewApi";

interface Props {
  skills: SkillDto[];
  loading: boolean;
  label: string; // "Skill" | "Subject" | "Topic"
  selectedSkill: string;
  onSelect: (name: string) => void;
}

export const SkillSelector: React.FC<Props> = ({ skills, loading, label, selectedSkill, onSelect }) => (
  <SectionCard
    title={`${label} Wise Practice`}
    subtitle={`Pick a ${label.toLowerCase()} to get AI-powered questions for your selected role.`}
  >
    {loading && (
      <Typography sx={{ p: 2, textAlign: "center", color: "#7588aa", fontSize: ".85rem" }}>
        Preparing {label.toLowerCase()}s for this role… the first time can take a few seconds.
      </Typography>
    )}
    <Grid container spacing={1.2}>
      {skills.map((skill) => {
        const { symbol, color } = getSkillVisual(skill.name);
        return (
          <Grid key={skill._id} size={{ xs: 6, sm: 4, md: 3, lg: 2 }}>
            <SelectorTile
              label={skill.name}
              selected={selectedSkill === skill.name}
              onClick={() => onSelect(skill.name)}
              minHeight={56}
              fontSize=".68rem"
              selectedBorder="#7c8cff"
              selectedBg="#f5f6ff"
              hoverBorder="#b1c2ff"
              chevronSize={16}
              leading={
                <Box
                  sx={{
                    width: 31, height: 31, flexShrink: 0, borderRadius: "9px",
                    bgcolor: `${color}18`, color, display: "grid", placeItems: "center",
                    fontSize: ".72rem", fontWeight: 900,
                  }}
                >
                  {symbol}
                </Box>
              }
            />
          </Grid>
        );
      })}
    </Grid>
  </SectionCard>
);