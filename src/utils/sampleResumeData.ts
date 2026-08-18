import type { ResumeData } from "../types/candidate/resume.types";


export const SAMPLE_RESUME_DATA: ResumeData = {
  personal: {
    firstName: "Mitin",
    lastName: "Patel",
    jobTitle: "Full Stack Developer",
    dateOfBirth: "1999-01-15",
    gender: "Male",
    maritalStatus: "Single",
    nationality: "Indian",
    photoUrl: "",
  },

  contact: {
    email: "mitin.patel@example.com",
    mobile: "+91 98765 43210",
    alternateMobile: "+91 98765 12345",
    address: "Katargam",
    city: "Surat",
    state: "Gujarat",
    country: "India",
    pincode: "395004",
  },

  social: {
    linkedInUrl: "https://linkedin.com/in/mitinpatel",
    gitHubUrl: "https://github.com/mitinpatel",
    portfolioUrl: "https://mitinpatel.dev",
    websiteUrl: "https://mitinpatel.dev",
  },

  summary: {
    professionalSummary:
      "Full Stack Developer with 3+ years of experience building scalable and responsive web applications using React.js, Node.js, TypeScript, MongoDB, and SQL Server. Experienced in REST API development, authentication, payment gateway integration, reusable UI components, and modern application architecture.",

    careerObjective:
      "To work as a Full Stack Developer where I can use my technical skills to build scalable applications while continuously learning and contributing to the growth of the organization.",
  },

  skills: [
    {
      skillName: "React.js",
      proficiency: "Expert",
      experienceInYears: 3,
    },
    {
      skillName: "Node.js",
      proficiency: "Advanced",
      experienceInYears: 3,
    },
    {
      skillName: "TypeScript",
      proficiency: "Advanced",
      experienceInYears: 2,
    },
    {
      skillName: "JavaScript",
      proficiency: "Expert",
      experienceInYears: 3,
    },
    {
      skillName: "MongoDB",
      proficiency: "Advanced",
      experienceInYears: 3,
    },
    {
      skillName: "Express.js",
      proficiency: "Advanced",
      experienceInYears: 3,
    },
    {
      skillName: "MUI",
      proficiency: "Advanced",
      experienceInYears: 2,
    },
    {
      skillName: "Redux Toolkit",
      proficiency: "Advanced",
      experienceInYears: 2,
    },
    {
      skillName: "SQL Server",
      proficiency: "Intermediate",
      experienceInYears: 2,
    },
    {
      skillName: "Docker",
      proficiency: "Intermediate",
      experienceInYears: 1,
    },
    {
      skillName: "Git",
      proficiency: "Advanced",
      experienceInYears: 3,
    },
  ],

  experience: [
    {
      companyName: "MV Technologies",
      designation: "Full Stack Developer",
      employmentType: "Full Time",
      location: "Surat, Gujarat",
      startDate: "2023-06-01",
      endDate: undefined,
      isCurrentCompany: true,
      description:
        "Develop and maintain scalable full-stack applications using React.js, Node.js, TypeScript, MongoDB, and SQL Server. Build reusable components, REST APIs, authentication systems, and third-party integrations.",
    },
    {
      companyName: "ABC Software Solutions",
      designation: "Software Developer",
      employmentType: "Full Time",
      location: "Surat, Gujarat",
      startDate: "2022-04-01",
      endDate: "2023-05-31",
      isCurrentCompany: false,
      description:
        "Developed responsive web applications using React.js and Node.js. Worked on REST APIs, database integration, bug fixing, performance optimization, and production deployments.",
    },
  ],

  education: [
    {
      instituteName: "Veer Narmad South Gujarat University",
      degree: "Bachelor of Computer Applications",
      fieldOfStudy: "Computer Applications",
      startDate: "2019-06-01",
      endDate: "2022-05-31",
      percentage: 82,
      grade: "A",
      description:
        "Studied software development, database management, programming, and computer applications.",
    },
  ],

  projects: [
    {
      projectName: "AI Career Operating System",
      role: "Full Stack Developer",
      description:
        "An AI-powered career management platform for creating resumes, managing candidate profiles, publishing resume websites, and improving job applications.",
      technologies: [
        "React.js",
        "TypeScript",
        "Node.js",
        "Express.js",
        "MongoDB",
        "MUI",
        "Framer Motion",
      ],
      projectUrl: "https://example.com",
    },
    {
      projectName: "Animated Resume Maker",
      role: "Full Stack Developer",
      description:
        "A modern resume builder with multiple templates, live preview, customizable themes, resume sections, and PDF download functionality.",
      technologies: [
        "React.js",
        "TypeScript",
        "MUI",
        "Framer Motion",
        "React Hook Form",
        "Zod",
        "Node.js",
      ],
      projectUrl: "https://example.com",
    },
  ],

  certifications: [
    {
      certificateName: "Full Stack Web Development",
      issuedBy: "Udemy",
      issuedDate: "2023-03-15",
      credentialId: "FSWD-2023-001",
      credentialUrl: "https://example.com/certificate",
    },
    {
      certificateName: "React.js Advanced Development",
      issuedBy: "Online Certification",
      issuedDate: "2024-02-20",
      credentialId: "REACT-ADV-2024",
      credentialUrl: "https://example.com/certificate",
    },
  ],

  achievements: [
    {
      title: "Best Performer",
      description:
        "Recognized for delivering high-quality features and consistently improving application performance.",
      achievementDate: "2025-12-01",
    },
    {
      title: "Production Optimization",
      description:
        "Improved API response performance and reduced unnecessary database operations.",
      achievementDate: "2025-08-15",
    },
  ],

  languages: [
    {
      languageName: "English",
      proficiencyLevel: "Professional",
    },
    {
      languageName: "Hindi",
      proficiencyLevel: "Professional",
    },
    {
      languageName: "Gujarati",
      proficiencyLevel: "Native",
    },
  ],
};