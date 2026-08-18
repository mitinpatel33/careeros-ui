// import { useEffect, useRef, useState } from "react";
// import { useReactToPrint } from "react-to-print";
// import { Box, Chip, Paper, Stack, Typography } from "@mui/material";
// import type {
//   ResumeData,
//   ResumeSectionKey,
//   ResumeTemplateId,
//   ResumeThemeColor,
//   ResumeDesignSettings,
// } from "../../../types/candidate/resume.types";
// import { defaultResumeSettings } from "../../../types/candidate/resume.types";
// import SectionSelector from "../../../components/common/SectionSelector";
// import ResumeRenderer from "../../../components/common/ResumeRenderer";
// import EditRoundedIcon from "@mui/icons-material/EditRounded";
// import StyleRoundedIcon from "@mui/icons-material/StyleRounded";
// import DownloadRoundedIcon from "@mui/icons-material/DownloadRounded";
// import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
// import ActionIconButton from "../../../components/common/ActionIconButton";
// import TemplateDrawer from "./components/TemplateDrawer";
// import ResumeSettingsDrawer from "./components/ResumeSettingsDrawer";
// import { useLazyGetProfileSectionsQuery } from "../../../services/candidateprofileApi";

// const ResumeBuilderPage = () => {
//   const sectionKeyMap: Record<string, string> = {
//     personal: "personal",
//     contact: "contact",
//     summary: "summary",
//     skills: "skills",
//     experience: "experiences", // UI "experience" → backend "experiences"
//     education: "educations", // UI "education" → backend "educations"
//     projects: "projects",
//     certificates: "certificates",
//     achievements: "achievements",
//     languages: "languages",
//     social: "social",
//   };

//   const printRef = useRef<HTMLDivElement>(null);

//   const [selectedSections, setSelectedSections] = useState<ResumeSectionKey[]>([
//     "personal",
//     "contact",
//     "summary",
//     "skills",
//     "experience",
//     "education",
//     "projects",
//   ]);

//   const [resumeData, setResumeData] = useState<ResumeData | null>(null);
//   const [selectedTemplate, setSelectedTemplate] =
//     useState<ResumeTemplateId>("classicElegant");
//   const [themeColor, setThemeColor] = useState<ResumeThemeColor>("blue");

//   const [templateOpen, setTemplateOpen] = useState(false);
//   const [settingsOpen, setSettingsOpen] = useState(false);
//   const [resumeSettings, setResumeSettings] = useState<ResumeDesignSettings>(
//     defaultResumeSettings,
//   );
//   const [shouldFetch, setShouldFetch] = useState(false);

//   const handlePrint = useReactToPrint({
//     contentRef: printRef,
//     documentTitle: "candidate-resume",
//     pageStyle: `
//     @page {
//       size: A4;
//       margin: 0;
//     }

//     html, body {
//       margin: 0 !important;
//       padding: 0 !important;
//       background: #fff !important;
//       -webkit-print-color-adjust: exact !important;
//       print-color-adjust: exact !important;
//     }

//     * {
//       box-sizing: border-box;
//     }

//     .resume-print-page {
//       width: 794px !important;
//       min-height: 1123px !important;
//       margin: 0 auto !important;
//       box-shadow: none !important;
//       border-radius: 0 !important;
//       overflow: hidden !important;
//       page-break-after: avoid !important;
//       page-break-before: avoid !important;
//     }

//     .no-print {
//       display: none !important;
//     }
//   `,
//   });

//   const includeString = selectedSections
//     .map((key) => sectionKeyMap[key])
//     .join(",");

//   // const {
//   //   data: sectionsData,
//   //   isLoading,
//   //   refetch,
//   // } = useLazyGetProfileSectionsQuery();

//   // useEffect(() => {
//   //   debugger
//   //   if (sectionsData) {
//   //     setResumeData(sectionsData?.data);
//   //     setShouldFetch(false); // reset if needed
//   //   }
//   // }, [sectionsData]);

//   const handleSubmitSections = () => {
//     if (selectedSections.length === 0) return;
//     setShouldFetch(true);
//     // If the query already ran with the same includeString, refetch to force fresh data
//     // refetch();
//   };

//   if (!resumeData) {
//     return (
//       <Box
//         sx={{
//           minHeight: "100vh",
//           p: { xs: 2, md: 4 },
//           background: "linear-gradient(135deg,#f8fafc,#eef2ff)",
//         }}
//       >
//         <Box sx={{ maxWidth: 1200, mx: "auto" }}>
//           <Typography variant="h3" sx={{ fontWeight: 950 }}>
//             Resume Maker ✨
//           </Typography>

//           <Typography color="text.secondary" sx={{ mb: 3 }}>
//             First choose which sections you want in your resume.
//           </Typography>

//           <SectionSelector
//             selectedSections={selectedSections}
//             loading={selectedSections.length === 0}
//             onChange={setSelectedSections}
//             onSubmit={handleSubmitSections}
//           />
//         </Box>
//       </Box>
//     );
//   }

//   return (
//     <Box
//       sx={{
//         minHeight: "100vh",
//         background:
//           "radial-gradient(circle at top left,#dbeafe 0,transparent 30%),linear-gradient(135deg,#f8fafc,#eef2ff)",
//         overflowX: "hidden",
//       }}
//     >
//       {/* Header */}
//       <Box
//         sx={{
//           px: { xs: 2, md: 4 },
//           py: 2.5,
//           borderBottom: "1px solid #e5e7eb",
//           bgcolor: "rgba(255,255,255,0.8)",
//           backdropFilter: "blur(14px)",
//         }}
//       >
//         <Stack
//           direction={{ xs: "column", md: "row" }}
//           sx={{
//             justifyContent: "space-between",
//             alignItems: { xs: "flex-start", md: "center" },
//           }}
//           spacing={2}
//         >
//           <Box>
//             <Typography
//               sx={{
//                 fontSize: { xs: 28, sm: 34, md: 42 },
//                 fontWeight: 950,
//               }}
//             >
//               Resume Design Studio ✨
//             </Typography>

//             <Stack direction="row" spacing={1} sx={{ mt: 1, flexWrap: "wrap" }}>
//               <Chip label="Live Preview" color="primary" size="small" />
//               <Chip label="ATS Friendly" color="success" size="small" />
//               <Chip label="PDF Ready" color="warning" size="small" />
//             </Stack>
//           </Box>

//           <Stack
//             direction="row"
//             spacing={1.5}
//             sx={{
//               justifyContent: { xs: "center", md: "flex-end" },
//               width: { xs: "100%", md: "auto" },
//             }}
//           >
//             <ActionIconButton
//               title="Edit Sections"
//               icon={EditRoundedIcon}
//               onClick={() => setResumeData(null)}
//               disabled={false}
//             />

//             <ActionIconButton
//               title="Templates"
//               icon={StyleRoundedIcon}
//               onClick={() => setTemplateOpen(true)}
//               disabled={false}
//             />

//             <ActionIconButton
//               title="Settings"
//               icon={SettingsOutlinedIcon}
//               onClick={() => setSettingsOpen(true)}
//               disabled={false}
//             />

//             <ActionIconButton
//               title="Download PDF"
//               icon={DownloadRoundedIcon}
//               onClick={handlePrint}
//               variant="filled"
//               disabled={false}
//             />
//           </Stack>
//         </Stack>
//       </Box>

//       {/* Main Studio */}
//       <Box
//         sx={{
//           px: { xs: 1.5, sm: 2, md: 4 },
//           py: { xs: 2, md: 3 },
//           pb: { xs: 26, md: 25 },
//           display: "grid",
//           gridTemplateColumns: {
//             xs: "1fr",
//             xl: "1fr 280px",
//           },
//           gap: 3,
//           maxWidth: 1500,
//           mx: "auto",
//         }}
//       >
//         {/* Preview */}
//         <Paper
//           sx={{
//             borderRadius: { xs: 4, md: 6 },
//             p: { xs: 1.5, sm: 2, md: 4 },
//             bgcolor: "rgba(255,255,255,0.65)",
//             border: "1px solid #e5e7eb",
//             boxShadow: "0 24px 70px rgba(15,23,42,0.12)",
//             minHeight: { xs: 540, md: "calc(100vh - 260px)" },
//             overflow: "auto",
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "flex-start",
//           }}
//         >
//           <Box
//             ref={printRef}
//             className="resume-print-page"
//             sx={{
//               width: "794px",
//               minHeight: "1123px",
//               flexShrink: 0,
//               bgcolor: "#fff",

//               transform: {
//                 xs: "scale(0.42)",
//                 sm: "scale(0.58)",
//                 md: "scale(0.78)",
//                 lg: "scale(0.88)",
//                 xl: "scale(0.82)",
//               },
//               transformOrigin: "top center",
//               mb: {
//                 xs: "-650px",
//                 sm: "-470px",
//                 md: "-250px",
//                 lg: "-130px",
//                 xl: "-200px",
//               },

//               "@media print": {
//                 transform: "none",
//                 mb: 0,
//                 width: "794px",
//                 minHeight: "1123px",
//                 overflow: "hidden",
//               },
//             }}
//           >
//             <ResumeRenderer
//               template={selectedTemplate}
//               data={resumeData}
//               themeColor={themeColor}
//               settings={resumeSettings}
//             />
//           </Box>
//         </Paper>
//       </Box>

//       <TemplateDrawer
//         open={templateOpen}
//         onClose={() => setTemplateOpen(false)}
//         selectedTemplate={selectedTemplate}
//         onChange={(template: any) => {
//           setSelectedTemplate(template);
//           setTemplateOpen(false);
//         }}
//       />

//       <ResumeSettingsDrawer
//         open={settingsOpen}
//         onClose={() => setSettingsOpen(false)}
//         settings={resumeSettings}
//         onChange={setResumeSettings}
//       />
//     </Box>
//   );
// };

// export default ResumeBuilderPage;
