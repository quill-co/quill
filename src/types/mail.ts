import { z } from "zod";
import { Config } from "@quill-co/mailstream";
import { ApplicationStatusEnum } from "./applications";

export type PartialMailConfig = Pick<Config, "email" | "password"> &
  Partial<Pick<Config, "port">>;

export enum MailboxProvider {
  Gmail = "gmail",
  Outlook = "outlook",
}

export const EmailResponseSchema = z.object({
  company: z.string(),
  title: z.string(),
  location: z.string(),
  status: ApplicationStatusEnum,
  date: z.date(),
  emailId: z.string(),
  rawEmail: z.string().optional(),
});

export type EmailResponse = z.infer<typeof EmailResponseSchema>;