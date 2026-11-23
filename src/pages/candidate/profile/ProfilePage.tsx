import {
  Box,
  Grid,
  Stack,
  Typography,
  Button,
  Paper,
  alpha,
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
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import {
  useGetCompletionQuery,
  useGetProfileCollectionQuery,
  useGetProfileQuery,
  useLazyGetProfileSectionsQuery,
} from "../../../services/candidateprofileApi";
import { useProfileSaver } from "../../../hooks/useProfileSaver";
import type { ResumeData } from "../../../types/candidate/resume.types";
import ResumeUploadModal from "../resumeUpload/ResumeUploadModal";
import { ChoicePage } from "../ChoicePage";
import { useSubscription } from "../../../hooks/useSubscription";
import type { PlanId } from "../../../types/plans";
import Loader from "../../../components/common/Loader";

const themeStyles = {
  titleColor: "#1d4ed8",
  subtitleColor: "#3b82f6",
  iconColor: "#2563eb",
  activeGradient: "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)",
  activeShadow: "0 8px 20px rgba(37, 99, 235, 0.35)",
  // medium-white mirror glass
  glassBg: "linear-gradient(135deg, rgba(255,255,255,0.62) 0%, rgba(255,255,255,0.38) 100%)",
  glassBorder: "1px solid rgba(255, 255, 255, 0.75)",
  glassFilter: "blur(18px) saturate(160%)",
  glassShadow:
    "0 8px 24px -6px rgba(37, 99, 235, 0.12), inset 0 1px 0 rgba(255,255,255,0.85)",
};

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, when: "beforeChildren" },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } },
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
const PricingStep = lazy(() => import("../../../pages/payment/PricingStep"));

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

const isProfileStepKey = (value: unknown): value is ProfileStepKey =>
  steps.some((step) => step.key === value);

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
  <Loader
    messages={["Loading your profile…", "Reviewing your details…", "Almost there…"]}
    minHeight={{ xs: 240, sm: 320 }}
  />
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
    isProfileStepKey(location.state?.step) ? location.state.step : "personal",
  );

  // Default to true after login/signup so choice screen opens first
  const [isHubView, setIsHubView] = useState(true);

  const [snackbar, setSnackbar] = useState<{
    message: string;
    severity: "success" | "error";
  } | null>(null);

  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
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
  } = useGetProfileQuery(activeStep, { skip: !isFormStep || isHubView });

  const {
    data: listData,
    isLoading: isListLoading,
    isError: isListError,
    error: listError,
  } = useGetProfileCollectionQuery(activeStep as ListStepKey, {
    skip: !isListStep || isHubView,
  });

  const { data: personalData } = useGetProfileQuery("personal");

  const isSummaryStep = activeStep === "summary" && !isHubView;
  const { data: skillsData } = useGetProfileCollectionQuery("skills", {
    skip: !isSummaryStep,
  });
  const { data: experiencesData } = useGetProfileCollectionQuery(
    "experiences",
    {
      skip: !isSummaryStep,
    },
  );

  const aiContext = useMemo(() => {
    const unwrap = (d: any) => (Array.isArray(d) ? d : d?.data || []);
    return {
      jobTitle: personalData?.data?.jobTitle?.trim() || "",
      skills: unwrap(skillsData),
      experience: unwrap(experiencesData),
    };
  }, [personalData, skillsData, experiencesData]);

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

  const { plan } = useSubscription();
  const [pricingFor, setPricingFor] = useState<PlanId | null>(null);

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

  const handleUploadSuccess = useCallback(() => {
    setIsHubView(false); // Transitions user straight to populated profile page steps
    setSnackbar({
      message: "Resume imported and profile filled automatically ✨",
      severity: "success",
    });
  }, []);

  const isStepLoading = isFormLoading || isListLoading || isCompletionLoading;
  const isStepError = isFormError || isListError;
  const errorMessage = isStepError
    ? (formError as any)?.data?.message ||
    (listError as any)?.data?.message ||
    "Failed to load data"
    : null;

  if (isStepError && !isStepLoading && !isHubView) {
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
        <Typography color="error" sx={{ fontWeight: 700 }}>
          {errorMessage}
        </Typography>
        <Button
          onClick={() => window.location.reload()}
          variant="contained"
          sx={{
            mt: 2,
            background: themeStyles.activeGradient,
            borderRadius: "12px",
          }}
        >
          Retry
        </Button>
      </Box>
    );
  }

  const renderActiveStep = () => {
    if (pricingFor) {
      return (
        <PricingStep
          user={{
            name: candidate.fullName || "",
            email: candidate.email || "",
            phone: candidate.mobile || candidate.phone || "",
          }}
          highlight={pricingFor}
          onBack={() => setPricingFor(null)}
          onDone={() => setPricingFor(null)}
        />
      );
    }

    if (isGalleryStep) {
      if (isPreviewMode) {
        if (isSectionsLoading || isSectionsFetching) return <TabLoader />;
        return (
          <Box>
            <Button
              variant="outlined"
              onClick={() => setIsPreviewMode(false)}
              sx={{
                mb: 2,
                textTransform: "none",
                fontWeight: 600,
                color: themeStyles.titleColor,
                borderColor: "rgba(147, 197, 253, 0.6)",
                bgcolor: "rgba(255, 255, 255, 0.45)",
                backdropFilter: themeStyles.glassFilter,
                borderRadius: "12px",
              }}
            >
              ← Change Selected Template
            </Button>
            <ResumeEditorPage
              initialTemplateId={selectedTemplate}
              data={resumeData}
            />
            <Stack direction="row" sx={{ justifyContent: "flex-end", mt: 3 }}>
              <Button
                variant="contained"
                onClick={goNext}
                sx={{
                  background: themeStyles.activeGradient,
                  boxShadow: themeStyles.activeShadow,
                  borderRadius: "12px",
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
      }
      return (
        <TemplateSelectionStep
          userPlan={plan}
          onUpgrade={(tier) => setPricingFor(tier)}
          isFirst={activeIndex === 0}
          isLast={activeIndex === steps.length - 1}
          onBack={goBack}
          loading={false}
          selectedTemplate={selectedTemplate}
          onSubmit={handleTemplateSubmit}
        />
      );
    }

    if (isFormStep) {
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
          {...(activeStep === "summary" ? { aiContext } : {})}
        />
      );
    }

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

  return (
    <Box sx={{ width: "100%", minHeight: "100%", overflowX: "hidden" }}>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Page Top Header */}
        {!isHubView && (
          <motion.div variants={itemVariants}>
            <Paper
              elevation={0}
              sx={{
                px: { xs: 1.5, sm: 2, md: 2.5 },
                py: { xs: 1, sm: 1.25, md: 1.5 },
                mb: { xs: 1, sm: 1.25, md: 1.5 },
                borderRadius: { xs: "14px", md: "18px" },
                background: themeStyles.glassBg,
                backdropFilter: themeStyles.glassFilter,
                WebkitBackdropFilter: themeStyles.glassFilter,
                border: themeStyles.glassBorder,
                boxShadow: themeStyles.glassShadow,
              }}
            >
              <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "center", gap: 1 }}>
                <Stack spacing={0} sx={{ minWidth: 0 }}>
                  <Typography
                    component="h1"
                    noWrap
                    sx={{
                      fontSize: { xs: 20, sm: 21, md: 24 },
                      lineHeight: 1.2,
                      fontWeight: 800,
                      color: themeStyles.titleColor,
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                    }}
                  >
                    Profile Setup
                  </Typography>
                  <Typography
                    sx={{
                      color: themeStyles.subtitleColor,
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      fontWeight: 600,
                      fontSize: { xs: 11, sm: 13 },
                      lineHeight: 1.35,
                      display: { xs: "none", sm: "block" }, // hidden on phones to save height
                    }}
                  >
                    Save profile sections or manage your resume and profile configuration.
                  </Typography>
                </Stack>

                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => setIsHubView(true)}
                  startIcon={<ArrowBackRoundedIcon />}
                  sx={{
                    flexShrink: 0,
                    whiteSpace: "nowrap",
                    borderRadius: "12px",
                    textTransform: "none",
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontWeight: 700,
                    px: { xs: 1.25, sm: 2 },
                    py: { xs: 0.4, sm: 0.6 },
                    fontSize: { xs: 12.5, sm: 13.5 },
                    color: themeStyles.titleColor,
                    borderColor: "rgba(59, 130, 246, 0.4)",
                    "&:hover": {
                      background: alpha(themeStyles.titleColor, 0.08),
                      borderColor: themeStyles.titleColor,
                    },
                  }}
                >
                  Hub
                </Button>
              </Stack>
            </Paper>
          </motion.div>
        )}

        {/* Dynamic View: Choice Hub or Profile Step Workflow */}
        {isHubView ? (
          <ChoicePage
            onCreateResume={() => {
              setIsHubView(false);
              setActiveStep("personal");
            }}
            onImportResume={() => setIsUploadModalOpen(true)}
          />
        ) : (
          // Sidebar is a vertical rail only from lg up; below that it becomes a compact
          // header + swipeable step strip on top of the form (phones & tablets).
          <Grid container spacing={{ xs: 1.5, sm: 2, lg: 3 }}>
            <Grid size={{ xs: 12, lg: 3.5 }} sx={{ minWidth: 0 }}>
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
                    setPricingFor(null);
                    setIsPreviewMode(false);
                    setActiveStep(step);
                  }}
                  completedSteps={[]}
                />
              </motion.div>
            </Grid>

            <Grid size={{ xs: 12, lg: 8.5 }} sx={{ minWidth: 0 }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={
                    activeStep +
                    (pricingFor
                      ? "-pricing"
                      : isPreviewMode
                        ? "-preview"
                        : "-step")
                  }
                  variants={stepTransitionVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  style={{ width: "100%" }}
                >
                  <Suspense fallback={<TabLoader />}>
                    {isStepLoading &&
                      !formData &&
                      !listData &&
                      !isGalleryStep ? (
                      <TabLoader />
                    ) : (
                      renderActiveStep()
                    )}
                  </Suspense>
                </motion.div>
              </AnimatePresence>
            </Grid>
          </Grid>
        )}
      </motion.div>

      {/* Resume Upload Modal */}
      <ResumeUploadModal
        open={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onSuccess={handleUploadSuccess}
      />

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