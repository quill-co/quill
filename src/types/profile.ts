import { z } from "zod";

export const ContactInfoSchema = z.object({
  email: z.string().email(),
  phone: z.string().min(10).max(15),
  address: z.string().optional(),
  linkedin: z.string().url().optional(),
  github: z.string().url().optional(),
  twitter: z.string().url().optional(),
  website: z.string().url().optional(),
});

export const ExperienceSchema = z.object({
  company: z.string(),
  position: z.string(),
  startDate: z.string(),
  endDate: z.string().optional(),
  description: z.string().optional(),
});

export const ProjectSchema = z.object({
  name: z.string(),
  description: z.string(),
  url: z.string().url().optional(),
});

export const EducationSchema = z.object({
  institution: z.string(),
  degree: z.string(),
  startDate: z.string(),
  endDate: z.string().optional(),
});

export const ProfileSchema = z.object({
  name: z.string(),
  contactInfo: ContactInfoSchema,
  experiences: z.array(ExperienceSchema),
  projects: z.array(ProjectSchema),
  resumeUrl: z.string().url(),
  summary: z.string().optional(),
  skills: z.array(z.string()).optional(),
  education: z.array(EducationSchema).optional(),
});

export type Profile = z.infer<typeof ProfileSchema>;