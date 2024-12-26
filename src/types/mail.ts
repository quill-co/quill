import { z } from "zod";
import { Config } from "@quill-co/mailstream";

export type PartialMailConfig = Pick<Config, "email" | "password"> &
  Partial<Pick<Config, "port">>;

export enum MailboxProvider {
  Gmail = "gmail",
  Outlook = "outlook",
}

export const ResponseStatusEnum = z.enum([
  "pending",
  "interview",
  "rejected",
  "offer",
  "under_review",
]);

export const EmailResponseSchema = z.object({
  company: z.string(),
  title: z.string(),
  location: z.string(),
  status: ResponseStatusEnum,
  date: z.date(),
  emailId: z.string(),
  rawEmail: z.string().optional(),
});

export type EmailResponse = z.infer<typeof EmailResponseSchema>;

export const ApplicationSchema = z.object({
  id: z.string(),
  company: z.string(),
  title: z.string(),
  location: z.string(),
  status: ResponseStatusEnum,
  emailId: z.string(),
  rawEmail: z.string().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type Application = z.infer<typeof ApplicationSchema>;

export interface ApplicationUpdate {
  company: string;
  title: string;
  location: string;
  status: string;
  emailId: string;
  date: Date;
}
