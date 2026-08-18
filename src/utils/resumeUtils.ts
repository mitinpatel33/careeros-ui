// src/utils/resumeUtils.ts

import { SAMPLE_RESUME_DATA } from "./sampleResumeData";

export const getNormalizedResumeData = (userProfileData: any) => {
  if (!userProfileData) return SAMPLE_RESUME_DATA;

  return {
    personal: {
      firstName:
        userProfileData?.personal?.firstName ||
        userProfileData?.firstName ||
        userProfileData?.fullName?.split(" ")[0] ||
        SAMPLE_RESUME_DATA?.personal?.firstName,
      lastName:
        userProfileData?.personal?.lastName ||
        userProfileData?.lastName ||
        userProfileData?.fullName?.split(" ")[1] ||
        SAMPLE_RESUME_DATA?.personal?.lastName,
      jobTitle:
        userProfileData?.personal?.jobTitle ||
        userProfileData?.jobTitle ||
        SAMPLE_RESUME_DATA?.personal?.jobTitle,
      dateOfBirth:
        userProfileData?.personal?.dateOfBirth ||
        SAMPLE_RESUME_DATA?.personal?.dateOfBirth,
      gender: userProfileData?.personal?.gender || SAMPLE_RESUME_DATA?.personal?.gender,
      maritalStatus:
        userProfileData?.personal?.maritalStatus ||
        SAMPLE_RESUME_DATA?.personal?.maritalStatus,
      nationality:
        userProfileData?.personal?.nationality ||
        SAMPLE_RESUME_DATA?.personal?.nationality,
      photoUrl:
        userProfileData?.personal?.photoUrl ||
        userProfileData?.personal?.photoURL ||
        "",
    },
    contact: {
      email:
        userProfileData?.contact?.email ||
        userProfileData?.email ||
        SAMPLE_RESUME_DATA?.contact?.email,
      mobile:
        userProfileData?.contact?.mobile ||
        userProfileData?.mobile ||
        SAMPLE_RESUME_DATA?.contact?.mobile,
      alternateMobile:
        userProfileData?.contact?.alternateMobile ||
        SAMPLE_RESUME_DATA?.contact?.alternateMobile,
      address:
        userProfileData?.contact?.address || SAMPLE_RESUME_DATA?.contact?.address,
      city: userProfileData?.contact?.city || SAMPLE_RESUME_DATA?.contact?.city,
      state: userProfileData?.contact?.state || SAMPLE_RESUME_DATA?.contact?.state,
      country:
        userProfileData?.contact?.country || SAMPLE_RESUME_DATA?.contact?.country,
      pincode:
        userProfileData?.contact?.pincode || SAMPLE_RESUME_DATA?.contact?.pincode,
    },
    social: {
      linkedInUrl:
        userProfileData?.social?.linkedInUrl ||
        SAMPLE_RESUME_DATA?.social?.linkedInUrl,
      gitHubUrl:
        userProfileData?.social?.gitHubUrl ||
        SAMPLE_RESUME_DATA?.social?.gitHubUrl,
      portfolioUrl:
        userProfileData?.social?.portfolioUrl ||
        SAMPLE_RESUME_DATA?.social?.portfolioUrl,
      websiteUrl:
        userProfileData?.social?.websiteUrl ||
        SAMPLE_RESUME_DATA?.social?.websiteUrl,
    },
    summary: {
      professionalSummary:
        userProfileData?.summary?.professionalSummary ||
        userProfileData?.summary?.summary ||
        SAMPLE_RESUME_DATA?.summary?.professionalSummary,
      careerObjective:
        userProfileData?.summary?.careerObjective ||
        SAMPLE_RESUME_DATA?.summary?.careerObjective,
    },
    skills:
      userProfileData?.skills && userProfileData.skills.length > 0
        ? userProfileData.skills
        : SAMPLE_RESUME_DATA?.skills,
    experience:
      userProfileData?.experience && userProfileData.experience.length > 0
        ? userProfileData.experience
        : SAMPLE_RESUME_DATA?.experience,
    education:
      userProfileData?.education && userProfileData.education.length > 0
        ? userProfileData.education
        : SAMPLE_RESUME_DATA?.education,
    projects:
      userProfileData?.projects && userProfileData.projects.length > 0
        ? userProfileData.projects
        : SAMPLE_RESUME_DATA?.projects,
    certifications:
      userProfileData?.certifications && userProfileData.certifications.length > 0
        ? userProfileData.certifications
        : SAMPLE_RESUME_DATA?.certifications,
    achievements:
      userProfileData?.achievements && userProfileData.achievements.length > 0
        ? userProfileData.achievements
        : SAMPLE_RESUME_DATA?.achievements,
    languages:
      userProfileData?.languages && userProfileData.languages.length > 0
        ? userProfileData.languages
        : SAMPLE_RESUME_DATA?.languages,
  };
};