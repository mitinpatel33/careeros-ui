// import type {
//   ResumeData,
//   ResumeSectionKey,
// } from "../types/candidate/resume.types";

// const mockResumeData: ResumeData = {
//   personal: {
//     // fullName: "Mitin Patel",
//     jobTitle: "Senior Full Stack Developer",
//     // location: "Surat, Gujarat, India",
//     // profileImage:
//     //   "https://randomuser.me/api/portraits/men/32.jpg",
//   },

//   contact: {
//     email: "mitinpatel99@gmail.com",
//     // phone: "+91 98765 43210",
//     // linkedIn: "https://linkedin.com/in/mitinpatel99",
//     // github: "https://github.com/mitinpatel99",
//     // portfolio: "https://mitinpatel.dev",
//   },

//   summary:
//     "Passionate Full Stack Developer with 3+ years of experience designing and developing scalable web applications using React.js, TypeScript, Node.js, Express.js, ASP.NET Core, SQL Server, and MongoDB. Strong experience in building enterprise applications, REST APIs, authentication systems, reusable UI components, and responsive interfaces. Passionate about clean architecture, performance optimization, and delivering high-quality user experiences.",

//   skills: [
//     "React.js",
//     "TypeScript",
//     "JavaScript",
//     "Node.js",
//     "Express.js",
//     "ASP.NET Core",
//     ".NET 8",
//     "C#",
//     "Entity Framework Core",
//     "SQL Server",
//     "MongoDB",
//     "REST API",
//     "Redux Toolkit",
//     "React Query",
//     "Material UI",
//     "Tailwind CSS",
//     "HTML5",
//     "CSS3",
//     "Git",
//     "GitHub",
//     "Azure DevOps",
//     "Docker",
//     "JWT Authentication",
//     "Framer Motion",
//     "Zod Validation",
//   ],

//   experience: [
//     {
//       companyName: "Engross Infotech",
//       designation: "Software Engineer",
//       duration: "Jan 2023 - Present",
//       description:
//         "Developed enterprise web applications using React.js, ASP.NET Core, SQL Server and Node.js. Built reusable UI components, optimized API performance, implemented authentication & authorization, created responsive dashboards and integrated REST APIs.",
//     },
//     {
//       companyName: "Freelance Projects",
//       designation: "Full Stack Developer",
//       duration: "Jul 2022 - Dec 2022",
//       description:
//         "Designed and developed MERN stack applications for clients, including admin panels, authentication systems, responsive dashboards, and e-commerce features.",
//     },
//   ],

//   education: [
//     {
//       degree: "Bachelor of Computer Applications (BCA)",
//       university: "Veer Narmad South Gujarat University",
//       year: "2022",
//       grade: "First Class with Distinction",
//     },
//     {
//       degree: "Higher Secondary Certificate (HSC)",
//       university: "Gujarat Higher Secondary Board",
//       year: "2019",
//       grade: "75%",
//     },
//   ],

//   projects: [
//     {
//       title: "Resume Builder Platform",
//       techStack:
//         "React.js, TypeScript, Node.js, Express.js, MongoDB",
//       description:
//         "Developed a professional resume builder where candidates can choose sections, select templates, preview resumes in real-time, customize themes, and download ATS-friendly PDF resumes.",
//     },
//     {
//       title: "Pet Care & Cure",
//       techStack:
//         "React.js, Node.js, Express.js, MongoDB",
//       description:
//         "Built a pet care platform providing pet health tips, rescue information, adoption support, and nearby animal welfare organizations with responsive UI.",
//     },
//     {
//       title: "Job Scheduler Dashboard",
//       techStack:
//         "React.js, ASP.NET Core, SQL Server",
//       description:
//         "Created a scheduler monitoring dashboard with job execution tracking, analytics, filtering, notifications, and report generation.",
//     },
//   ],

//   certifications: [
//     "Microsoft Certified: Azure Fundamentals (AZ-900)",
//     "Node.js - Complete Backend Development",
//     "React.js Advanced Certification",
//     "REST API Design & Development",
//   ],

//   achievements: [
//     "Successfully delivered 15+ enterprise web application modules.",
//     "Improved application performance by 40% through API optimization.",
//     "Developed reusable UI component library used across multiple projects.",
//     "Recognized as Best Performer for delivering critical production releases.",
//   ],

//   languages: [
//     "English (Professional)",
//     "Hindi (Native)",
//     "Gujarati (Native)",
//   ],

//   references: [
//     {
//       name: "Rahul Sharma",
//       company: "Engineering Manager - Engross Infotech",
//       email: "rahul.sharma@example.com",
//       phone: "+91 98765 11111",
//     },
//     {
//       name: "Priya Patel",
//       company: "Technical Lead",
//       email: "priya.patel@example.com",
//       phone: "+91 98765 22222",
//     },
//   ],
// };


// // const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// export const resumeApi = {
//   getResumeBySelectedSections: async (
//     payload: { sections: ResumeSectionKey[] },
//   ): Promise<ResumeData> => {
//     await new Promise((resolve) => setTimeout(resolve, 700));

//     const filteredData: Partial<ResumeData> = {};

//     payload.sections.forEach((section: any) => {
//       if (section in mockResumeData) {
//         const sectionKey = section as keyof ResumeData;
//         (filteredData as any)[sectionKey] = mockResumeData[sectionKey];
//       }
//     });

//     return filteredData as ResumeData;
//   },
// };

// // export const resumeApi = {
// //   getResumeBySelectedSections: async (
// //     payload: ResumeSectionRequest,
// //   ): Promise<ResumeData> => {
// //     const response = await fetch(`${API_URL}/resume/selected-sections`, {
// //       method: "POST",
// //       headers: {
// //         "Content-Type": "application/json",
// //       },
// //       body: JSON.stringify(payload),
// //     });

// //     if (!response.ok) {
// //       throw new Error("Failed to load resume details");
// //     }

// //     const result = await response.json();
// //     return result.data;
// //   },
// // };
