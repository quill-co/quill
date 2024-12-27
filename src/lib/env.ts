import { z } from "zod";
import dotenv from "dotenv";

dotenv.config();

const environmentSchema = z.object({
  OPENAI_API_KEY: z.string().min(1),
  ANTHROPIC_API_KEY: z.string().min(1),
  BROWSERBASE_API_KEY: z.string().min(1),
  ENV: z.union([z.literal("development"), z.literal("production")]),
  BROWSERBASE_PROJECT_ID: z.string().min(1),
  BROWSER_ENV: z.union([z.literal("LOCAL"), z.literal("BROWSERBASE")]),
  DB_FILE_NAME: z.string().min(1),
});

const env = environmentSchema.parse(process.env);
export default env;
