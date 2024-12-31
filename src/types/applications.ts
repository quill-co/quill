import { z } from "zod";

export const ApplicationStatusEnum = z.enum([
  "pending",
  "interview",
  "rejected",
  "offer",
  "under_review",
]);

export type ApplicationStatus = z.infer<typeof ApplicationStatusEnum>;

export const ApplicationSchema = z.object({
  id: z.string(),
  company: z.string(),
  title: z.string(),
  location: z.string(),
  status: ApplicationStatusEnum,
  emailId: z.string(),
  rawEmail: z.string().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type Application = z.infer<typeof ApplicationSchema>;

export const ApplicationStatusFlowSchema = z.object({
  id: z.string(),
  currentStatus: ApplicationStatusEnum,
  nextStatus: ApplicationStatusEnum.nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type ApplicationStatusFlow = z.infer<typeof ApplicationStatusFlowSchema>;

export interface ApplicationUpdate {
  company: string;
  title: string;
  location: string;
  status: string;
  emailId: string;
  date: Date;
}