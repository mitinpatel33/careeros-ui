import {
  Box,
  Grid,
  Stack,
  Typography,
  CircularProgress,
  Button,
  Paper,
} from "@mui/material";
import {
  useMemo,
  useState,
  useCallback,
  lazy,
  Suspense,
  type ComponentType,
} from "react";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import { useLocation } from "react-router-dom";

import ProfileStepCards, { type ProfileStepKey } from "./ProfileStepCards";
import AppSnackbar from "../../../components/common/AppSnackbar";
import {
  useGetCompletionQuery,
  useGetProfileCollectionQuery,
  useGetProfileQuery,
  useLazyGetProfileSectionsQuery,
} from "../../../services/candidateprofileApi";
import { useProfileSaver } from "../../../hooks/useProfileSaver";
import type { ResumeData } from "../../../types/candidate/resume.types";

// Visual style token palette matching Glassmorphism Blue theme
const themeStyles = {
  titleColor: "#1d4ed8",
  subtitleColor: "#3b82f6",
  iconColor: "#2563eb",
  activeGradient: "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)",
  activeShadow: "0 8px 20px rgba(37, 99, 235, 0.35)",
  glassBg: "rgba(255, 255, 255, 0.65)",
  glassBorder: "1px solid rgba(255, 255, 255, 0.8)",
  glassFilter: "blur(16px)",
};

// Motion animation variants for step switching & page elements
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      when: "beforeChildren",
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: "easeOut" },
  },
};

const stepTransitionVariants: Variants = {
  initial: { opacity: 0, scale: 0.98, y: 8 },
  animate: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.25, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    scale: 0.98,
    y: -8,
    transition: { duration: 0.2, ease: "easeIn" },
  },
};

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
const TemplateSelectionStep = lazy(
  () => import("./tabs/TemplateSelectionStep"),
);
const PublishSettings = lazy(() => import("./tabs/PublishSettings"));
const ResumeEditorPage = lazy(
  () => import("../../../components/templates/NewTemplate/ResumeEditorPage"),
);

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
  { key: "template", title: "Choose Template", type: "gallery" },
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

const FORM_STEP_COMPONENTS: Partial<
  Record<ProfileStepKey, ComponentType<any>>
> = {
  personal: PersonalDetails,
  summary: SummaryDetails,
  contact: ContactDetails,
  social: SocialDetails,
  settings: PublishSettings,
};

const LIST_STEP_COMPONENTS: Record<ListStepKey, ComponentType<any>> = {
  skills: SkillsDetails,
  educations: EducationDetails,
  experiences: ExperienceDetails,
  projects: ProjectsDetails,
  certificates: CertificatesDetails,
  achievements: AchievementsDetails,
  languages: LanguagesDetails,
};

const TabLoader = () => (
  <Box
    sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: 300,
      py: 6,
    }}
  >
    <CircularProgress sx={{ color: themeStyles.iconColor }} size={36} />
  </Box>
);

const mapSectionsToResumeData = (sections: any): ResumeData | undefined => {
  if (!sections) return undefined;
  return {
    personal: sections.personal,
    contact: sections.contact,
    summary: sections.summary,
    social: sections.social,
    skills: sections.skills || [],
    education: sections.educations || [],
    experience: sections.experiences || [],
    projects: sections.projects || [],
    certifications: sections.certificates || [],
    achievements: sections.achievements || [],
    languages: sections.languages || [],
  };
};

const ProfilePage = () => {
  const location = useLocation();
  const [activeStep, setActiveStep] = useState<ProfileStepKey>(
    location.state?.step ?? "personal",
  );
  const [snackbar, setSnackbar] = useState<{
    message: string;
    severity: "success" | "error";
  } | null>(null);

  const [selectedTemplate, setSelectedTemplate] = useState<string>(
    () => localStorage.getItem("selected_resume_template") || "classic-blue",
  );
  const [isPreviewMode, setIsPreviewMode] = useState(false);

  const candidate = useMemo(() => {
    const raw = localStorage.getItem("user");
    return raw ? JSON.parse(raw) : { fullName: "" };
  }, []);

  const activeIndex = steps.findIndex((s) => s.key === activeStep);
  const currentStep = steps[activeIndex];
  const isFormStep = currentStep.type === "form";
  const isListStep = currentStep.type === "list";
  const isGalleryStep = currentStep.type === "gallery";

  const { data: completionData, isLoading: isCompletionLoading } =
    useGetCompletionQuery();

  const {
    data: formData,
    isLoading: isFormLoading,
    isError: isFormError,
    error: formError,
  } = useGetProfileQuery(activeStep, { skip: !isFormStep });

  const {
    data: listData,
    isLoading: isListLoading,
    isError: isListError,
    error: listError,
  } = useGetProfileCollectionQuery(activeStep as ListStepKey, {
    skip: !isListStep,
  });

  const { data: personalData } = useGetProfileQuery("personal");

  const [
    fetchSections,
    {
      data: sectionsData,
      isLoading: isSectionsLoading,
      isFetching: isSectionsFetching,
    },
  ] = useLazyGetProfileSectionsQuery();

  const resumeData = useMemo(
    () => mapSectionsToResumeData(sectionsData?.data),
    [sectionsData],
  );

  const { saveStep } = useProfileSaver({
    onSuccess: (_, title) => {
      setSnackbar({
        message: `${title} saved successfully ✨`,
        severity: "success",
      });
    },
    onError: (_, title) => {
      setSnackbar({ message: `Failed to save ${title}`, severity: "error" });
    },
    onNavigateNext: () => {
      const next = steps[activeIndex + 1];
      if (next) setActiveStep(next.key as ProfileStepKey);
    },
  });

  const goNext = useCallback(() => {
    const next = steps[activeIndex + 1];
    if (next) setActiveStep(next.key as ProfileStepKey);
  }, [activeIndex]);

  const goBack = useCallback(() => {
    const prev = steps[activeIndex - 1];
    if (prev) setActiveStep(prev.key as ProfileStepKey);
  }, [activeIndex]);

  const handleTemplateSubmit = useCallback(
    (values: { selectedTemplate: string }) => {
      setSelectedTemplate(values.selectedTemplate);
      localStorage.setItem("selected_resume_template", values.selectedTemplate);
      setIsPreviewMode(true);
      fetchSections();
    },
    [fetchSections],
  );

  const isStepLoading = isFormLoading || isListLoading || isCompletionLoading;
  const isStepError = isFormError || isListError;
  const errorMessage = isStepError
    ? (formError as any)?.data?.message ||
      (listError as any)?.data?.message ||
      "Failed to load data"
    : null;

  if (isStepError && !isStepLoading) {
    return (
      <Box
        sx={{
          p: { xs: 3, md: 5 },
          textAlign: "center",
          bgcolor: themeStyles.glassBg,
          backdropFilter: themeStyles.glassFilter,
          WebkitBackdropFilter: themeStyles.glassFilter,
          border: themeStyles.glassBorder,
          borderRadius: "24px",
          maxWidth: 480,
          mx: "auto",
          mt: 6,
        }}
      >
        <Typography
          color="error"
          sx={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontWeight: 700,
          }}
        >
          {errorMessage}
        </Typography>
        <Button
          onClick={() => window.location.reload()}
          variant="contained"
          sx={{
            mt: 2,
            background: themeStyles.activeGradient,
            boxShadow: themeStyles.activeShadow,
            borderRadius: "12px",
            textTransform: "none",
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontWeight: 600,
          }}
        >
          Retry
        </Button>
      </Box>
    );
  }

  const renderPreviewPanel = () => {
    if (isSectionsLoading || isSectionsFetching) return <TabLoader />;

    return (
      <Box>
        <Button
          variant="outlined"
          onClick={() => setIsPreviewMode(false)}
          sx={{
            mb: 2,
            textTransform: "none",
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontWeight: 600,
            color: themeStyles.titleColor,
            borderColor: "rgba(147, 197, 253, 0.6)",
            bgcolor: "rgba(255, 255, 255, 0.45)",
            backdropFilter: themeStyles.glassFilter,
            WebkitBackdropFilter: themeStyles.glassFilter,
            borderRadius: "12px",
            "&:hover": {
              borderColor: themeStyles.titleColor,
              bgcolor: "rgba(255, 255, 255, 0.85)",
            },
          }}
        >
          ← Change Selected Template
        </Button>
        <ResumeEditorPage templateId={selectedTemplate} data={resumeData} />
        <Stack direction="row" sx={{ justifyContent: "flex-end", mt: 3 }}>
          <Button
            variant="contained"
            onClick={goNext}
            sx={{
              background: themeStyles.activeGradient,
              boxShadow: themeStyles.activeShadow,
              borderRadius: "12px",
              textTransform: "none",
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 700,
              px: 3,
              py: 1,
            }}
          >
            Next Step →
          </Button>
        </Stack>
      </Box>
    );
  };

  const renderGalleryStep = () => {
    if (isPreviewMode) return renderPreviewPanel();
    return (
      <TemplateSelectionStep
        isFirst={activeIndex === 0}
        isLast={activeIndex === steps.length - 1}
        onBack={goBack}
        loading={false}
        selectedTemplate={selectedTemplate}
        onSubmit={handleTemplateSubmit}
      />
    );
  };

  const renderFormStep = () => {
    const FormComponent = FORM_STEP_COMPONENTS[activeStep];
    if (!FormComponent) return null;
    return (
      <FormComponent
        loading={isFormLoading}
        isFirst={activeIndex === 0}
        isLast={activeIndex === steps.length - 1}
        onBack={goBack}
        defaultValues={formData?.data}
        onSubmit={(values: unknown) => saveStep(activeStep, values)}
      />
    );
  };

  const renderListStep = () => {
    const ListComponent = LIST_STEP_COMPONENTS[activeStep as ListStepKey];
    if (!ListComponent) return null;
    return (
      <ListComponent
        items={
          Array.isArray(listData) ? listData : (listData as any)?.data || []
        }
        loading={isListLoading}
        isFirst={activeIndex === 0}
        isLast={activeIndex === steps.length - 1}
        onBack={goBack}
        onSave={(items: unknown) => saveStep(activeStep, items)}
      />
    );
  };

  const renderActiveStep = () => {
    if (isGalleryStep) return renderGalleryStep();
    if (isFormStep) return renderFormStep();
    return renderListStep();
  };

  return (
    <Box sx={{ width: "100%", minHeight: "100%", overflowX: "hidden" }}>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Page Top Header with Blue Glassmorphism */}
        <motion.div
          variants={itemVariants}
          style={{
            position: "sticky",
            top: 16,
            zIndex: 10,
            marginBottom: 24,
          }}
        >
          <Paper
            elevation={0}
            sx={{
              p: { xs: 2.5, sm: 3 },
              mb: { xs: 2.5, md: 3.5 },
              borderRadius: "24px",
              bgcolor: "rgba(255, 255, 255, 0.65)",
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
              border: "1px solid rgba(255, 255, 255, 0.8)",
              boxShadow: "0 10px 30px -5px rgba(37, 99, 235, 0.08)",
            }}
          >
            <Stack spacing={0.5}>
              <Typography
                sx={{
                  fontSize: { xs: 24, sm: 28, md: 32 },
                  fontWeight: 800,
                  color: themeStyles.titleColor,
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  letterSpacing: "-0.02em",
                }}
              >
                Profile Setup 🚀
              </Typography>
              <Typography
                sx={{
                  color: themeStyles.subtitleColor,
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontWeight: 600,
                  fontSize: { xs: 13, sm: 14 },
                }}
              >
                Save profile sections and choose your resume style.
              </Typography>
            </Stack>
          </Paper>
        </motion.div>

        {/* Dynamic Sidebar & Step Section Grid */}
        <Grid container spacing={{ xs: 2, md: 3 }}>
          <Grid size={{ xs: 12, md: 4, lg: 3.5 }}>
            <motion.div variants={itemVariants}>
              <ProfileStepCards
                activeStep={activeStep}
                completion={completionData?.data?.completionPercentage ?? 0}
                fullName={candidate.fullName}
                jobTitle={personalData?.data?.jobTitle}
                photoURL={
                  personalData?.data?.photoUrl ||
                  personalData?.data?.photoURL ||
                  ""
                }
                onStepChange={(step) => {
                  setIsPreviewMode(false);
                  setActiveStep(step);
                }}
                completedSteps={[]}
              />
            </motion.div>
          </Grid>

          <Grid size={{ xs: 12, md: 8, lg: 8.5 }} sx={{ minWidth: 0 }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep + (isPreviewMode ? "-preview" : "-step")}
                variants={stepTransitionVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                style={{ width: "100%" }}
              >
                <Suspense fallback={<TabLoader />}>
                  {isStepLoading && !formData && !listData && !isGalleryStep ? (
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
