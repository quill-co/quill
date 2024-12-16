// This is an example for how to input your mail config into Quill.
// Input your own information here and rename this file to config.ts

import { PartialMailConfig } from "@/types/mail";

export const mailConfig: PartialMailConfig = {
  email: "your.email@gmail.com",
  password: "your-app-specific-password", // Create an app-specific password in your email provider's security settings
  port: 993
};