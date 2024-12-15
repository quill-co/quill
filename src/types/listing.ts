import { z } from "zod";

export const RecruiterEnum = z.enum(["greenhouse", "lever", "other"]);

export const JobListingSchema = z.object({
  title: z.string(),
  company: z.string(),
  location: z.string(),
  description: z.string(),
  url: z.string(),
  recruiter: RecruiterEnum,
});

export type JobListing = z.infer<typeof JobListingSchema>;
