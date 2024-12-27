import { LLMType } from "@/types/llm";
import { EmailResponse } from "@/types/mail";
import { anthropic } from "@ai-sdk/anthropic";
import { openai } from "@ai-sdk/openai";
import { generateText, LanguageModel, tool } from "ai";
import { z } from "zod";

const models = {
  [LLMType.GPT4o]: openai("gpt-4o"),
  [LLMType.Claude35Latest]: anthropic("claude-3-5-sonnet-latest"),
  [LLMType.MistralLargeLatest]: openai("mistral-large-latest"),
};

export class LLMProvider {
  private model: LanguageModel;

  constructor(model: LLMType) {
    this.model = models[model];
  }

  async analyzeEmail(
    content: string,
    subject: string,
    sender: string,
  ): Promise<EmailResponse | null> {
    const response = await generateText({
      model: this.model,
      system:
        "You are an AI that analyzes job application emails and updates application statuses.",
      prompt: `Subject: ${subject}\nFrom: ${sender}\n\nContent: ${content}`,
      tools: {
        updateApplicationStatus: tool({
          description: "Update the job application status in the database",
          parameters: z.object({
            company: z.string(),
            title: z.string(),
            status: z.enum(["pending", "interview", "rejected", "offer"]),
            location: z.string(),
          }),
          execute: async ({ company, title, status }) => {
            console.log(
              `Updating application status for ${company} - ${title} to ${status}`,
            );
          },
        }),
      },
      maxSteps: 1,
    });

    const toolCalls = response.steps.flatMap((step) => step.toolCalls);
    const toolCall = toolCalls[0];
    if (toolCall?.toolName === "updateApplicationStatus") {
      return {
        ...toolCall.args,
        date: new Date(),
        emailId: crypto.randomUUID(),
      };
    }

    return null;
  }
}
