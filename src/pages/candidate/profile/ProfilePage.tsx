import {
  Box,
  Grid,
  Stack,
  Typography,
  CircularProgress,
  Button,
} from "@mui/material";
import {
  useMemo,
  useState,
  useCallback,
  lazy,
  Suspense,
  type ComponentType,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
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

// ---------------------------------------------------------------------------
// Lazy-loaded step components
// ---------------------------------------------------------------------------
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

// ---------------------------------------------------------------------------
// Step definitions
// ---------------------------------------------------------------------------
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

// Every form step takes the same prop shape (defaultValues + onSubmit + nav
// props), so a lookup table replaces a hand-written JSX branch per step.
const FORM_STEP_COMPONENTS: Partial<
  Record<ProfileStepKey, ComponentType<any>>
> = {
  personal: PersonalDetails,
  summary: SummaryDetails,
  contact: ContactDetails,
  social: SocialDetails,
  settings: PublishSettings,
};

// Same idea for list/collection steps.
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
  <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
    <CircularProgress />
  </Box>
);

/**
 * Maps the raw `/profile/sections` payload (keyed by API route names, e.g.
 * "educations", "certificates") onto the `ResumeData` shape the resume
 * templates expect (e.g. "education", "certifications").
 */
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

  // Client-side template state (stored in localStorage)
  const [selectedTemplate, setSelectedTemplate] = useState<string>(
    () => localStorage.getItem("selected_resume_template") || "classic-blue",
  );

  // Switches step 12 from "pick a template" -> "preview & download"
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

  // Used for the sidebar name/photo/job title — always fetched.
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
      fetchSections(); // ✅ Manually triggers the query fetch safely
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

  const renderPreviewPanel = () => {
    if (isSectionsLoading || isSectionsFetching) return <TabLoader />;

    return (
      <Box>
        <Button
          variant="outlined"
          onClick={() => setIsPreviewMode(false)}
          sx={{ mb: 2, textTransform: "none" }}
        >
          ← Change Selected Template
        </Button>
        <ResumeEditorPage templateId={selectedTemplate} data={resumeData} />
        <Stack direction="row" sx={{ justifyContent: "flex-end", mt: 3 }}>
          <Button variant="contained" onClick={goNext}>
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
            Save profile sections and choose your resume style.
          </Typography>
        </Stack>

        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 4 }}>
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
          </Grid>

          <Grid size={{ xs: 12, md: 8 }} sx={{ minWidth: 0 }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep + (isPreviewMode ? "-preview" : "-step")}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.3 }}
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
