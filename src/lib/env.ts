import { z } from "zod";

const environmentSchema = z.object({
  OPENAI_API_KEY: z.string().min(1),
  ANTHROPIC_API_KEY: z.string().min(1),
  BROWSERBASE_API_KEY: z.string().min(1),
  ENV: z.union([
    z.literal("development"),
    z.literal("testing"),
    z.literal("production"),
  ]),
});

const env = environmentSchema.parse(process.env);

export default env;
