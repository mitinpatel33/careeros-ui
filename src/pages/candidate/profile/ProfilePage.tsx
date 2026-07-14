import { Box, Grid, Stack, Typography } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLocation } from "react-router-dom";

import ProfileStepCards, { type ProfileStepKey } from "./ProfileStepCards";
import AppSnackbar from "../../../components/common/AppSnackbar";

import PersonalDetails from "./tabs/PersonalDetails";
import SummaryDetails from "./tabs/SummaryDetails";
import ContactDetails from "./tabs/ContactDetails";
import SocialDetails from "./tabs/SocialDetails";
import SettingsDetails from "./tabs/SettingsDetails";

import SkillsDetails from "./tabs/SkillsDetails";
import EducationDetails from "./tabs/EducationDetails";
import ExperienceDetails from "./tabs/ExperienceDetails";
import ProjectsDetails from "./tabs/ProjectsDetails";
import CertificatesDetails from "./tabs/CertificatesDetails";
import AchievementsDetails from "./tabs/AchievementsDetails";
import LanguagesDetails from "./tabs/LanguagesDetails";

const steps = [
  { key: "personal", title: "Personal", type: "form" },
  { key: "summary", title: "Summary", type: "form" },
  { key: "contact", title: "Contact", type: "form" },
  { key: "social", title: "Social", type: "form" },
  { key: "skills", title: "Skills", type: "list" },
  { key: "educations", title: "Education", type: "list" },
  { key: "experiences", title: "Experience", type: "list" },
  { key: "projects", title: "Projects", type: "list" },
  { key: "certificates", title: "Certificates", type: "list" },
  { key: "achievements", title: "Achievements", type: "list" },
  { key: "languages", title: "Languages", type: "list" },
  { key: "settings", title: "Settings", type: "form" },
] as const;

type ListStepKey =
  | "skills"
  | "educations"
  | "experiences"
  | "projects"
  | "certificates"
  | "achievements"
  | "languages";

const emptyLists: Record<ListStepKey, any[]> = {
  skills: [],
  educations: [],
  experiences: [],
  projects: [],
  certificates: [],
  achievements: [],
  languages: [],
};

const ProfilePage = () => {
  const location = useLocation();

  const [activeStep, setActiveStep] = useState<ProfileStepKey>(
    location.state?.step ?? "personal"
  );

  const [completedSteps, setCompletedSteps] = useState<ProfileStepKey[]>([]);
  const [lists, setLists] = useState(emptyLists);

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [saving, setSaving] = useState(false);

  const activeIndex = steps.findIndex((x) => x.key === activeStep);
  const currentStep = steps[activeIndex];

  const completion = useMemo(
    () => Math.round((completedSteps.length / steps.length) * 100),
    [completedSteps]
  );

  useEffect(() => {
    if (location.state?.step) {
      setActiveStep(location.state.step);
    }
  }, [location.state]);

  const goNext = () => {
    const next = steps[activeIndex + 1];
    if (next) setActiveStep(next.key);
  };

  const goBack = () => {
    const prev = steps[activeIndex - 1];
    if (prev) setActiveStep(prev.key);
  };

  const markComplete = (step: ProfileStepKey) => {
    setCompletedSteps((prev) =>
      prev.includes(step) ? prev : [...prev, step]
    );
  };

  const saveStep = async (step: ProfileStepKey, values?: any) => {
    try {
      setSaving(true);

      console.log("Saving step:", step, values);

      // Step-wise API call here
      // await updateProfileSection({ section: step, data: values }).unwrap();

      markComplete(step);
      setSuccessMessage(`${currentStep.title} saved successfully ✨`);

      setTimeout(goNext, 400);
    } catch {
      setErrorMessage(`${currentStep.title} save failed`);
    } finally {
      setSaving(false);
    }
  };

  const updateList = (
    step: ListStepKey,
    action: "add" | "edit" | "delete",
    item?: any
  ) => {
    setLists((prev) => {
      const current = prev[step] ?? [];

      if (action === "add") {
        return {
          ...prev,
          [step]: [
            ...current,
            {
              id: crypto.randomUUID(),
              title: "New Item",
              displayOrder: current.length + 1,
            },
          ],
        };
      }

      if (action === "delete") {
        return {
          ...prev,
          [step]: current.filter((x) => x.id !== item.id),
        };
      }

      return prev;
    });
  };

  const formProps = {
    loading: saving,
    isFirst: activeIndex === 0,
    isLast: activeIndex === steps.length - 1,
    onBack: goBack,
  };

  const formComponents: Partial<Record<ProfileStepKey, React.ReactNode>> = {
    personal: (
      <PersonalDetails
        {...formProps}
        onSubmit={(values: any) => saveStep("personal", values)}
      />
    ),
    summary: (
      <SummaryDetails
        {...formProps}
        onSubmit={(values: any) => saveStep("summary", values)}
      />
    ),
    contact: (
      <ContactDetails
        {...formProps}
        onSubmit={(values: any) => saveStep("contact", values)}
      />
    ),
    social: (
      <SocialDetails
        {...formProps}
        onSubmit={(values: any) => saveStep("social", values)}
      />
    ),
    settings: (
      <SettingsDetails
        {...formProps}
        onSubmit={(values: any) => saveStep("settings", values)}
      />
    ),
  };

  const listProps = (step: ListStepKey) => ({
    items: lists[step],
    onAdd: () => updateList(step, "add"),
    onEdit: (item: any) => console.log("Edit:", step, item),
    onDelete: (item: any) => updateList(step, "delete", item),
  });

  const listComponents: Record<ListStepKey, React.ReactNode> = {
    skills: <SkillsDetails {...listProps("skills")} />,
    educations: <EducationDetails {...listProps("educations")} />,
    experiences: <ExperienceDetails {...listProps("experiences")} />,
    projects: <ProjectsDetails {...listProps("projects")} />,
    certificates: <CertificatesDetails {...listProps("certificates")} />,
    achievements: <AchievementsDetails {...listProps("achievements")} />,
    languages: <LanguagesDetails {...listProps("languages")} />,
  };

  const renderActiveStep = () => {
    if (currentStep.type === "form") {
      return formComponents[activeStep];
    }

    return listComponents[activeStep as ListStepKey];
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        p: { xs: 2, md: 4 },
        background: "linear-gradient(135deg,#eef6ff,#f5f0ff)",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Stack spacing={0.8} sx={{ mb: 4 }}>
          <Typography sx={{ fontSize: { xs: 30, md: 42 }, fontWeight: 900 }}>
            Profile Setup ✨
          </Typography>

          <Typography color="text.secondary">
            Save each profile section separately with smooth animations.
          </Typography>
        </Stack>

        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 4 }}>
            <ProfileStepCards
              activeStep={activeStep}
              completedSteps={completedSteps}
              completion={completion}
              fullName="Mitin Patel"
              jobTitle="Full Stack Developer"
              onStepChange={setActiveStep}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 8 }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, x: 30, scale: 0.98 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -30, scale: 0.98 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
              >
                {renderActiveStep()}
              </motion.div>
            </AnimatePresence>
          </Grid>
        </Grid>
      </motion.div>

      <AppSnackbar
        successMessage={successMessage}
        errorMessage={errorMessage}
        onCloseSuccess={() => setSuccessMessage("")}
        onCloseError={() => setErrorMessage("")}
      />
    </Box>
  );
};

export default ProfilePage;