// import { useMemo, useState } from "react";
// import {
//   Drawer,
//   Box,
//   Typography,
//   Stack,
//   IconButton,
//   Divider,
// } from "@mui/material";
// import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

// import { resumeTemplates } from "../../../../data/resumeTemplates";
// import type { ResumeTemplateId } from "../../../../types/candidate/resume.types";
// import type { TemplateCategory } from "../../../../types/resumeTemplate.types";
// import TemplateFilters from "./TemplateFilters";
// import TemplateCard from "./TemplateCard";

// type Props = {
//   open: boolean;
//   onClose: () => void;
//   selectedTemplate: ResumeTemplateId;
//   onChange: (template: ResumeTemplateId) => void;
// };

// const TemplateDrawer = ({
//   open,
//   onClose,
//   selectedTemplate,
//   onChange,
// }: Props) => {
//   const [search, setSearch] = useState("");
//   const [category, setCategory] = useState<"All" | TemplateCategory>("All");

//   const filteredTemplates = useMemo(() => {
//     return resumeTemplates.filter((item) => {
//       const matchSearch =
//         item.name.toLowerCase().includes(search.toLowerCase()) ||
//         item.description.toLowerCase().includes(search.toLowerCase());

//       const matchCategory = category === "All" || item.category === category;

//       return matchSearch && matchCategory;
//     });
//   }, [search, category]);

//   return (
//     <Drawer
//       anchor="right"
//       open={open}
//       onClose={onClose}
//       slotProps={{
//         paper: {
//           sx: {
//             width: { xs: "100%", sm: 420, md: 460 },
//             bgcolor: "#f8fafc",
//             overflow: "hidden",
//           },
//         },
//       }}
//     >
//       <Box
//         sx={{
//           height: "100%",
//           display: "flex",
//           flexDirection: "column",
//         }}
//       >
//         <Box sx={{ p: { xs: 2, sm: 2.5 } }}>
//           <Stack
//             direction="row"
//             sx={{
//               justifyContent: "space-between",
//               alignItems: "flex-start",
//               gap: 2,
//             }}
//           >
//             <Box>
//               <Typography variant="h5" sx={{ fontWeight: 950 }}>
//                 Templates 🎨
//               </Typography>

//               <Typography color="text.secondary" sx={{ fontSize: 13 }}>
//                 Choose your resume design.
//               </Typography>
//             </Box>

//             <IconButton
//               onClick={onClose}
//               sx={{
//                 bgcolor: "#fff",
//                 border: "1px solid #e5e7eb",
//                 "&:hover": { bgcolor: "#fee2e2", color: "#dc2626" },
//               }}
//             >
//               <CloseRoundedIcon />
//             </IconButton>
//           </Stack>

//           <Divider sx={{ my: 2 }} />

//           <TemplateFilters
//             search={search}
//             category={category}
//             onSearchChange={setSearch}
//             onCategoryChange={setCategory}
//           />
//         </Box>

//         <Box
//           sx={{
//             px: { xs: 2, sm: 2.5 },
//             pb: 2,
//             flex: 1,
//             overflowY: "auto",
//             "&::-webkit-scrollbar": { width: 6 },
//             "&::-webkit-scrollbar-thumb": {
//               bgcolor: "#cbd5e1",
//               borderRadius: 10,
//             },
//           }}
//         >
//           <Stack spacing={1.2}>
//             {filteredTemplates.map((item) => (
//               <TemplateCard
//                 key={item.id}
//                 template={item}
//                 selected={selectedTemplate === item.id}
//                 onClick={() => onChange(item.id)}
//               />
//             ))}
//           </Stack>

//           {filteredTemplates.length === 0 && (
//             <Box
//               sx={{
//                 mt: 5,
//                 p: 3,
//                 textAlign: "center",
//                 borderRadius: 4,
//                 bgcolor: "#fff",
//                 border: "1px dashed #cbd5e1",
//               }}
//             >
//               <Typography sx={{ fontWeight: 900 }}>
//                 No template found
//               </Typography>
//               <Typography sx={{ fontSize: 13, color: "text.secondary" }}>
//                 Try another search or category.
//               </Typography>
//             </Box>
//           )}
//         </Box>
//       </Box>
//     </Drawer>
//   );
// };

// export default TemplateDrawer;
