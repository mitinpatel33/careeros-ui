// // FinancialProfileTemplate.tsx
// import { Box, Typography, Paper, Avatar } from "@mui/material";
// import SchoolIcon from "@mui/icons-material/School";
// import WorkIcon from "@mui/icons-material/Work";
// import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
// import PersonIcon from "@mui/icons-material/Person";
// import EmailIcon from "@mui/icons-material/Email";
// import PhoneIcon from "@mui/icons-material/Phone";
// import LinkedInIcon from "@mui/icons-material/LinkedIn";
// import TwitterIcon from "@mui/icons-material/Twitter";
// import type { TemplateRenderProps } from "../../../types/resumeTemplate.types";

// const ACCENT = "#F7C325";
// const DARK = "#1a1a1a";
// const MUTED = "#5a5a5a";

// /** Format a Date or string into "Mon YYYY" */
// const formatDate = (d?: Date | string) => {
//   if (!d) return "";
//   return new Date(d).toLocaleDateString("en-US", {
//     year: "numeric",
//     month: "short",
//   });
// };

// const formatRange = (
//   start?: Date | string,
//   end?: Date | string,
//   isCurrent?: boolean,
// ) => {
//   const startStr = formatDate(start);
//   if (isCurrent || !end) return `${startStr} – Present`;
//   return `${startStr} – ${formatDate(end)}`;
// };

// const FinancialProfileTemplate = ({
//   data,
//   config,
//   settings,
// }: TemplateRenderProps) => {
//   const fullName = `${data.personal?.firstName ?? ""} ${
//     data.personal?.lastName ?? ""
//   }`.trim();

//   const summaryText =
//     data.summary?.professionalSummary || data.summary?.careerObjective || "";

//   const photoUrl = data.personal?.photoUrl ?? data.personal?.profileImage;

//   return (
//     <Paper
//       elevation={0}
//       sx={{
//         width: "794px",
//         minHeight: "1123px",
//         mx: "auto",
//         fontFamily: settings?.fontFamily ?? "'Segoe UI', Arial, sans-serif",
//         fontSize: settings?.fontSize ?? 12,
//         border: "1px solid #e5e7eb",
//         borderRadius: "20px",
//         overflow: "hidden",
//         position: "relative",
//         bgcolor: "#fff",
//       }}
//     >
//       {/* ================= HEADER ================= */}
//       <Box sx={{ position: "relative", height: 320 }}>
//         {/* yellow circle */}
//         <Box
//           sx={{
//             position: "absolute",
//             top: 24,
//             right: 48,
//             width: 240,
//             height: 240,
//             borderRadius: "50%",
//             bgcolor: ACCENT,
//             zIndex: 1,
//           }}
//         />
//         {/* photo */}
//         <Box
//           sx={{
//             position: "absolute",
//             top: 8,
//             right: 32,
//             width: 270,
//             height: 300,
//             zIndex: 2,
//           }}
//         >
//           <Avatar
//             src={photoUrl}
//             variant="square"
//             sx={{
//               width: "100%",
//               height: "100%",
//               bgcolor: "#ddd",
//             }}
//           >
//             {!photoUrl && (data.personal?.firstName?.[0] ?? "?")}
//           </Avatar>
//         </Box>

//         {/* name card */}
//         <Box
//           sx={{
//             position: "absolute",
//             top: 48,
//             left: 32,
//             width: 270,
//             height: 224,
//             bgcolor: "#fff",
//             borderRadius: "50%",
//             zIndex: 3,
//             boxShadow: "0 8px 24px rgba(0,0,0,0.06)",
//             display: "flex",
//             flexDirection: "column",
//             justifyContent: "center",
//             px: 4,
//           }}
//         >
//           <Typography
//             sx={{
//               fontSize: 26,
//               fontWeight: 800,
//               lineHeight: 1.15,
//               color: DARK,
//               mb: 1.5,
//             }}
//           >
//             {fullName}
//           </Typography>

//           {data.personal?.jobTitle && (
//             <Box
//               sx={{
//                 display: "inline-block",
//                 bgcolor: ACCENT,
//                 color: DARK,
//                 fontSize: 10,
//                 fontWeight: 700,
//                 letterSpacing: "1px",
//                 textTransform: "uppercase",
//                 px: 1.5,
//                 py: 0.5,
//                 mb: 2,
//                 width: "fit-content",
//               }}
//             >
//               {data.personal.jobTitle}
//             </Box>
//           )}

//           {/* {data.personal?.company && (
//             <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//               <Box
//                 sx={{
//                   width: 20,
//                   height: 20,
//                   bgcolor: DARK,
//                   clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
//                   position: "relative",
//                   "&::after": {
//                     content: '""',
//                     position: "absolute",
//                     inset: "4px",
//                     bgcolor: ACCENT,
//                     clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
//                   },
//                 }}
//               />
//               {/* <Typography sx={{ fontSize: 12, fontWeight: 600, color: DARK }}>
//                 {data.experience.}
//               </Typography> */}
//             </Box>
//           )} */}
//         </Box>
//       </Box>

//       {/* ================= BODY ================= */}
//       <Box
//         sx={{
//           px: 6,
//           py: 4,
//           display: "grid",
//           gridTemplateColumns: "1fr 1fr",
//           columnGap: 5,
//           rowGap: 4,
//           position: "relative",
//           "&::before": {
//             content: '""',
//             position: "absolute",
//             top: 8,
//             bottom: 8,
//             left: "50%",
//             width: "1px",
//             bgcolor: "#e2e2e2",
//           },
//         }}
//       >
//         {/* Education & Experience */}
//         {data.education && data.education.length > 0 && (
//           <Section
//             icon={<SchoolIcon sx={{ fontSize: 22 }} />}
//             title="Education & Experience"
//           >
//             {summaryText && (
//               <Typography sx={{ fontSize: 12.5, color: MUTED, mb: 1 }}>
//                 {summaryText}
//               </Typography>
//             )}
//             <Box component="ol" sx={{ m: 0, pl: 2.5 }}>
//               {data.education.map((edu, i) => (
//                 <Typography
//                   component="li"
//                   key={i}
//                   sx={{ fontSize: 12.5, color: MUTED, mb: 0.75 }}
//                 >
//                   {edu.degree}
//                   {edu.instituteName ? ` – ${edu.instituteName}` : ""}
//                   {edu.startDate || edu.endDate
//                     ? `, ${formatRange(edu.startDate, edu.endDate)}`
//                     : ""}
//                 </Typography>
//               ))}
//             </Box>
//           </Section>
//         )}

//         {/* Working Approach (Experience) */}
//         {data.experience && data.experience.length > 0 && (
//           <Section
//             icon={<WorkIcon sx={{ fontSize: 22 }} />}
//             title="Working Approach"
//           >
//             {data.experience.map((exp, i) => (
//               <Box key={i} sx={{ mb: 1.5 }}>
//                 <Typography
//                   sx={{ fontSize: 12.5, fontWeight: 600, color: DARK }}
//                 >
//                   {exp.designation}
//                   {exp.companyName ? ` – ${exp.companyName}` : ""}
//                 </Typography>
//                 <Typography sx={{ fontSize: 11.5, color: "#888" }}>
//                   {formatRange(
//                     exp.startDate,
//                     exp.endDate,
//                     exp.isCurrentCompany,
//                   )}
//                 </Typography>
//                 {exp.description && (
//                   <Typography sx={{ fontSize: 12.5, color: MUTED, mt: 0.5 }}>
//                     {exp.description}
//                   </Typography>
//                 )}
//               </Box>
//             ))}
//           </Section>
//         )}

//         {/* Achievements */}
//         {data.achievements && data.achievements.length > 0 && (
//           <Section
//             icon={<EmojiEventsIcon sx={{ fontSize: 22 }} />}
//             title="Achievements"
//           >
//             {data.achievements.map((ach, i) => (
//               <Typography
//                 key={i}
//                 sx={{
//                   fontSize: 12.5,
//                   color: MUTED,
//                   mb: 1,
//                   position: "relative",
//                   pl: 1.5,
//                   "&::before": {
//                     content: '"·"',
//                     position: "absolute",
//                     left: 0,
//                     fontWeight: 900,
//                   },
//                 }}
//               >
//                 <strong>{ach.title}</strong>
//                 {ach.description ? ` – ${ach.description}` : ""}
//               </Typography>
//             ))}
//           </Section>
//         )}

//         {/* Outside the Office (Languages / extra info) */}
//         {data.languages && data.languages.length > 0 && (
//           <Section
//             icon={<PersonIcon sx={{ fontSize: 22 }} />}
//             title="Outside the Office"
//           >
//             {data.languages.map((lang, i) => (
//               <Typography
//                 key={i}
//                 sx={{ fontSize: 12.5, color: MUTED, mb: 0.5 }}
//               >
//                 {lang.languageName}
//                 {lang.proficiencyLevel ? ` – ${lang.proficiencyLevel}` : ""}
//               </Typography>
//             ))}
//             {data.summary?.careerObjective && (
//               <Typography
//                 sx={{
//                   fontSize: 12.5,
//                   fontStyle: "italic",
//                   color: DARK,
//                   mt: 1.5,
//                 }}
//               >
//                 “{data.summary.careerObjective}”
//               </Typography>
//             )}
//           </Section>
//         )}
//       </Box>

//       {/* ================= FOOTER ================= */}
//       <Box
//         sx={{
//           px: 6,
//           py: 3,
//           borderTop: "1px solid #e2e2e2",
//           display: "grid",
//           gridTemplateColumns: "1fr 1fr",
//           rowGap: 2,
//           columnGap: 3,
//         }}
//       >
//         {data.contact?.email && (
//           <ContactRow
//             icon={<EmailIcon sx={{ fontSize: 16 }} />}
//             text={data.contact.email}
//           />
//         )}
//         {data.social?.linkedInUrl && (
//           <ContactRow
//             icon={<LinkedInIcon sx={{ fontSize: 16 }} />}
//             text={data.social?.linkedInUrl}
//           />
//         )}
//         {data.contact?.mobile && (
//           <ContactRow
//             icon={<PhoneIcon sx={{ fontSize: 16 }} />}
//             text={data.contact.mobile}
//           />
//         )}
//         {/* {data.contact?.twitter && (
//           <ContactRow
//             icon={<TwitterIcon sx={{ fontSize: 16 }} />}
//             text={data.social.twitter}
//           />
//         )} */}
//       </Box>
//     </Paper>
//   );
// };

// /** Reusable Section component with icon + heading */
// const Section = ({
//   icon,
//   title,
//   children,
// }: {
//   icon: React.ReactNode;
//   title: string;
//   children: React.ReactNode;
// }) => (
//   <Box>
//     <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 1.5 }}>
//       <Box
//         sx={{
//           width: 44,
//           height: 44,
//           borderRadius: "50%",
//           bgcolor: ACCENT,
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//           flexShrink: 0,
//           color: DARK,
//         }}
//       >
//         {icon}
//       </Box>
//       <Typography
//         sx={{ fontSize: 16, fontWeight: 800, color: DARK, lineHeight: 1.2 }}
//       >
//         {title}
//       </Typography>
//     </Box>
//     {children}
//   </Box>
// );

// /** Reusable footer contact row */
// const ContactRow = ({
//   icon,
//   text,
// }: {
//   icon: React.ReactNode;
//   text: string;
// }) => (
//   <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
//     <Box
//       sx={{
//         width: 30,
//         height: 30,
//         borderRadius: "50%",
//         bgcolor: ACCENT,
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//         flexShrink: 0,
//         color: DARK,
//       }}
//     >
//       {icon}
//     </Box>
//     <Typography sx={{ fontSize: 12.5, color: DARK }}>{text}</Typography>
//   </Box>
// );

// export default FinancialProfileTemplate;
