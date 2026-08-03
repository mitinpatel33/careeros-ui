import {
  Box,
  Grid,
  Stack,
  Typography,
  CircularProgress,
  Button,
} from "@mui/material";
import {
  useEffect,
  useMemo,
  useState,
  useCallback,
  lazy,
  Suspense,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLocation } from "react-router-dom";

import ProfileStepCards, { type ProfileStepKey } from "./ProfileStepCards";
import AppSnackbar from "../../../components/common/AppSnackbar";
import {
  useGetCompletionQuery,
  useGetProfileCollectionQuery,
  useGetProfileQuery,
  useUpdateProfileMutation,
} from "../../../services/candidateprofileApi";
import { useProfileSaver } from "../../../hooks/useProfileSaver";

// Lazy load tab components for better initial load
const PersonalDetails = lazy(() => import("./tabs/PersonalDetails"));
const SummaryDetails = lazy(() => import("./tabs/SummaryDetails"));
const ContactDetails = lazy(() => import("./tabs/ContactDetails"));
const SocialDetails = lazy(() => import("./tabs/SocialDetails"));
const SkillsDetails = lazy(() => import("./tabs/SkillsDetails"));
const EducationDetails = lazy(() => import("./tabs/EducationDetails"));
const ExperienceDetails = lazy(() => import("./tabs/ExperienceDetails"));
const ProjectsDetails = lazy(() => import("./tabs/ProjectsDetails"));
const CertificatesDetails = lazy(() => import("./tabs/CertificatesDetails"));
const AchievementsDetails = lazy(() => import("./tabs/AchievementsDetails"));
const LanguagesDetails = lazy(() => import("./tabs/LanguagesDetails"));
const PublishSettings = lazy(() => import("./tabs/PublishSettings"));

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

type ListStepKey = Extract<
  ProfileStepKey,
  | "skills"
  | "educations"
  | "experiences"
  | "projects"
  | "certificates"
  | "achievements"
  | "languages"
>;

// Loading fallback for lazy tabs
const TabLoader = () => (
  <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
    <CircularProgress />
  </Box>
);

const ProfilePage = () => {
  const location = useLocation();
  const [activeStep, setActiveStep] = useState<ProfileStepKey>(
    location.state?.step ?? "personal",
  );

  // Snackbar state
  const [snackbar, setSnackbar] = useState<{
    message: string;
    severity: "success" | "error";
  } | null>(null);

  // Get user from localStorage (memoized)
  const candidate = useMemo(() => {
    const raw = localStorage.getItem("user");
    return raw ? JSON.parse(raw) : { fullName: "" };
  }, []);

  // Determine step type
  const currentStep = useMemo(
    () => steps.find((s) => s.key === activeStep)!,
    [activeStep],
  );
  const isFormStep = currentStep.type === "form";
  const isListStep = currentStep.type === "list";

  // RTK Query hooks
  const { data: completionData, isLoading: isCompletionLoading } =
    useGetCompletionQuery();
  console.log('completionData', completionData)
  // Fetch form data – only if active step is form
  const {
    data: formData,
    isLoading: isFormLoading,
    isError: isFormError,
    error: formError,
  } = useGetProfileQuery(activeStep, { skip: !isFormStep });

  // Fetch list data – only if active step is list
  const {
    data: listData,
    isLoading: isListLoading,
    isError: isListError,
    error: listError,
  } = useGetProfileCollectionQuery(activeStep as ListStepKey, {
    skip: !isListStep,
  });

  // Mutation hooks
  const [updateProfile, { isLoading: isUpdateLoading }] =
    useUpdateProfileMutation();

  // Custom save hook (handles both form and list)
  const { saveStep } = useProfileSaver({
    onSuccess: (step, title) => {
      setSnackbar({
        message: `${title} saved successfully ✨`,
        severity: "success",
      });
    },
    onError: (step, title) => {
      setSnackbar({ message: `Failed to save ${title}`, severity: "error" });
    },
    onNavigateNext: () => {
      const next = steps[activeIndex + 1];
      if (next) setActiveStep(next.key);
    },
  });

  // Navigation helpers (memoized)
  const activeIndex = steps.findIndex((s) => s.key === activeStep);

  const goNext = useCallback(() => {
    const next = steps[activeIndex + 1];
    if (next) setActiveStep(next.key);
  }, [activeIndex]);

  const goBack = useCallback(() => {
    const prev = steps[activeIndex - 1];
    if (prev) setActiveStep(prev.key);
  }, [activeIndex]);

  // Combine loading/error states for active step
  const isLoading = isFormLoading || isListLoading || isUpdateLoading;
  const isError = isFormError || isListError;
  const errorMessage = isError
    ? (formError as any)?.data?.message ||
      (listError as any)?.data?.message ||
      "Failed to load data"
    : null;

  // If there's an error loading the section, show a retry or fallback
  if (isError && !isLoading) {
    return (
      <Box sx={{ p: 4, textAlign: "center" }}>
        <Typography color="error">{errorMessage}</Typography>
        <Button
          onClick={() => window.location.reload()}
          variant="contained"
          sx={{ mt: 2 }}
        >
          Retry
        </Button>
      </Box>
    );
  }

  // Common props for all form tabs
  const formProps = {
    loading: isUpdateLoading,
    isFirst: activeIndex === 0,
    isLast: activeIndex === steps.length - 1,
    onBack: goBack,
  };

  // Form components map – will be lazy loaded
  const formComponents: Partial<Record<ProfileStepKey, React.ReactNode>> = {
    personal: (
      <PersonalDetails
        {...formProps}
        defaultValues={formData?.data}
        onSubmit={(values) => saveStep("personal", values)}
      />
    ),
    summary: (
      <SummaryDetails
        {...formProps}
        defaultValues={formData?.data}
        onSubmit={(values) => saveStep("summary", values)}
      />
    ),
    contact: (
      <ContactDetails
        {...formProps}
        defaultValues={formData?.data}
        onSubmit={(values) => saveStep("contact", values)}
      />
    ),
    social: (
      <SocialDetails
        {...formProps}
        defaultValues={formData?.data}
        onSubmit={(values) => saveStep("social", values)}
      />
    ),
    settings: (
      <PublishSettings
        {...formProps}
        defaultValues={formData?.data}
        onSubmit={(values) => saveStep("settings", values)}
      />
    ),
  };

  // List components – items are directly from RTK Query result
  const listComponents: Record<ListStepKey, React.ReactNode> = {
    skills: (
      <SkillsDetails
        items={listData?.data || []}
        loading={isListLoading}
        onSave={(items) => saveStep("skills", items)}
      />
    ),
    educations: (
      <EducationDetails
        items={listData?.data || []}
        loading={isListLoading}
        onSave={(items) => saveStep("educations", items)}
      />
    ),
    experiences: (
      <ExperienceDetails
        items={listData?.data || []}
        loading={isListLoading}
        onSave={(items) => saveStep("experiences", items)}
      />
    ),
    projects: (
      <ProjectsDetails
        items={listData?.data || []}
        loading={isListLoading}
        onSave={(items) => saveStep("projects", items)}
      />
    ),
    certificates: (
      <CertificatesDetails
        items={listData?.data || []}
        loading={isListLoading}
        onSave={(items) => saveStep("certificates", items)}
      />
    ),
    achievements: (
      <AchievementsDetails
        items={listData?.data || []}
        loading={isListLoading}
        onSave={(items) => saveStep("achievements", items)}
      />
    ),
    languages: (
      <LanguagesDetails
        items={listData?.data || []}
        loading={isListLoading}
        onSave={(items) => saveStep("languages", items)}
      />
    ),
  };

  const renderActiveStep = () => {
    if (isFormStep) return formComponents[activeStep];
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
              completion={completionData?.data?.completionPercentage ?? 0}
              fullName={candidate.fullName}
              jobTitle={formData?.data?.jobTitle}
              onStepChange={setActiveStep}
              completedSteps={[]}
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
                <Suspense fallback={<TabLoader />}>
                  {isLoading && !formData && !listData ? (
                    <TabLoader />
                  ) : (
                    renderActiveStep()
                  )}
                </Suspense>
              </motion.div>
            </AnimatePresence>
          </Grid>
        </Grid>
      </motion.div>

      <AppSnackbar
        successMessage={
          snackbar?.severity === "success" ? snackbar.message : ""
        }
        errorMessage={snackbar?.severity === "error" ? snackbar.message : ""}
        onCloseSuccess={() => setSnackbar(null)}
        onCloseError={() => setSnackbar(null)}
      />
    </Box>
  );
};

export default ProfilePage;
