// This is an example for how to input your profile into Quill.
// Input your own information here and rename this file to profile.ts
// Add your resume to src/config/resume.pdf

import { Profile } from "@/types/profile";

export const profile: Profile = {
  name: "John Doe",
  contactInfo: {
    email: "john.doe@example.com",
    phone: "1234567890",
    address: {
      street: "123 Main St",
      city: "Anytown",
      state: "State",
      zip: "12345",
      country: "USA",
    },
    linkedin: "https://www.linkedin.com/in/johndoe",
    github: "https://github.com/johndoe",
    twitter: "https://twitter.com/johndoe",
    website: "https://www.johndoe.com",
  },
  experiences: [
    {
      company: "Tech Corp",
      position: "Software Engineer",
      startDate: "2020-01-01",
      endDate: "2022-01-01",
      description: "Worked on developing web applications.",
    },
  ],
  projects: [
    {
      name: "Project Alpha",
      description: "A web application for managing tasks.",
      url: "https://www.projectalpha.com",
    },
  ],
  resumeUrl: "https://www.johndoe.com/resume.pdf",
  summary: "A passionate software engineer with experience in web development.",
  skills: ["JavaScript", "TypeScript", "React", "Node.js"],
  education: [
    {
      institution: "State University",
      degree: "Bachelor of Science in Computer Science",
      startDate: "2015-09-01",
      endDate: "2019-06-01",
    },
  ],
  protectedVeteran: false,
  race: "Do not disclose",
  needsSponsorship: false,
};
