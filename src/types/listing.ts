import { z } from "zod";

export const JobListingSchema = z.object({
  title: z.string(),
  company: z.string(),
  location: z.string(),
  description: z.string(),
  url: z.string(),
  recruiter: z.enum(["greenhouse", "workday", "linkedin", "other"]),
});

export type JobListing = z.infer<typeof JobListingSchema>;
