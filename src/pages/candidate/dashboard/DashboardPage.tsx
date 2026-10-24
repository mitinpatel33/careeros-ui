import React, { useEffect, useState } from "react";
import { Box, Container, Grid, Stack } from "@mui/material";
import { useGetCategoriesQuery, useGetJobTitlesQuery, useGetSkillsQuery, type JobTitleDto } from "../../../services/interviewApi";
import { pageBackgroundSx } from "../../Interview/styles";
import { PageHeader } from "../../Interview/components/PageHeader";
import { HeroBanner } from "../../Interview/components/HeroBanner";
import { StatsGrid } from "../../Interview/components/StatsGrid";
import { JobSelector } from "../../Interview/components/JobSelector";
import { SkillSelector } from "../../Interview/components/SkillSelector";
import { QuestionPanel } from "../../Interview/components/QuestionPanel";
import { MockTestPanel } from "../../Interview/components/MockTestPanel";
import { RecentActivity } from "../../Interview/components/RecentActivity";
import { ComingSoon } from "../../Interview/components/ComingSoon";

/** Set VITE_INTERVIEW_ENABLED=true to show the live assistant. Anything else shows "Coming Soon". */
const INTERVIEW_ENABLED = import.meta.env.VITE_INTERVIEW_ENABLED === "true";

interface Props {
  userId?: string;
  /** candidatePersonalInfo.jobTitleId, used as the default pick */
  defaultJobTitleId?: string;
}

/* ---------------- the live assistant (unchanged) ---------------- */
const InterviewAssistant: React.FC<Props> = ({ userId, defaultJobTitleId }) => {
  const { data: categories = [] } = useGetCategoriesQuery();
  const { data } = useGetJobTitlesQuery();

  const [selectedJob, setSelectedJob] = useState<JobTitleDto | null>(null);
  const [selectedSkill, setSelectedSkill] = useState("");

  useEffect(() => {
    if (selectedJob || !data?.data.length) return;
    setSelectedJob(data.data.find((j) => j._id === defaultJobTitleId) ?? data.data[0]);
  }, [data, defaultJobTitleId, selectedJob]);

  const { data: skills = [], isFetching: skillsLoading } = useGetSkillsQuery(
    selectedJob?._id ?? "",
    { skip: !selectedJob },
  );

  useEffect(() => {
    if (skills.length && !skills.some((s) => s.name === selectedSkill)) {
      setSelectedSkill(skills[0].name);
    }
  }, [skills, selectedSkill]);

  const skillLabel =
    categories.find((c) => c._id === selectedJob?.categoryId)?.skillLabel ?? "Skill";

  return (
    <Box sx={pageBackgroundSx}>
      <Container maxWidth="xl" disableGutters>
        <Stack spacing={{ xs: 1.5, sm: 2 }}>
          <PageHeader />
          <HeroBanner />
          <StatsGrid stats={data?.stats} />
          <JobSelector
            categories={categories}
            selectedJob={selectedJob}
            onSelect={(job) => {
              setSelectedJob(job);
              setSelectedSkill("");
            }}
          />
          <SkillSelector
            skills={skills}
            loading={skillsLoading}
            label={skillLabel}
            selectedSkill={selectedSkill}
            onSelect={setSelectedSkill}
          />

          <Grid container spacing={{ xs: 1.5, sm: 2 }} sx={{ position: "relative", zIndex: 1 }}>
            <Grid size={{ xs: 12, lg: 7 }}>
              <QuestionPanel
                selectedJob={selectedJob}
                skills={skills}
                skillLabel={skillLabel}
                selectedSkill={selectedSkill}
                onSkillChange={setSelectedSkill}
              />
            </Grid>
            <Grid size={{ xs: 12, lg: 5 }}>
              <MockTestPanel
                selectedJob={selectedJob}
                skills={skills}
                skillLabel={skillLabel}
                userId={userId}
                selectedSkill={selectedSkill}
                onSkillChange={setSelectedSkill}
              />
            </Grid>
          </Grid>

          <RecentActivity userId={userId} />
        </Stack>
      </Container>
    </Box>
  );
};

/* ---------------- what the route renders ---------------- */
export const CandidateDashboardPage: React.FC<Props> = (props) =>
  INTERVIEW_ENABLED ? <InterviewAssistant {...props} /> : <ComingSoon />;

export default CandidateDashboardPage;