import env from "@/lib/env";
import { OpenAI } from "openai";
import { LLMProvider, EmailResponse } from "@/types/mail";

export class OpenAIProvider implements LLMProvider {
  private client: OpenAI;

  constructor() {
    this.client = new OpenAI({
      apiKey: env.OPENAI_API_KEY
    });
  }

  async analyzeEmail(content: string, subject: string, sender: string): Promise<EmailResponse | null> {
    const tools = [{
      type: "function" as const,
      function: {
        name: "update_application_status",
        description: "Update the job application status in the database",
        parameters: {
          type: "object",
          properties: {
            company: { 
              type: "string",
              description: "Company name"
            },
            title: { 
              type: "string",
              description: "Job title"
            },
            status: { 
              type: "string",
              enum: ["pending", "interview", "rejected", "offer", "under_review"],
              description: "Current application status"
            }
          },
          required: ["company", "title", "status"]
        }
      }
    }];

    const completion = await this.client.chat.completions.create({
      model: "gpt-4",
      messages: [{
        role: "system",
        content: "You are an AI that analyzes job application emails and updates application statuses."
      }, {
        role: "user",
        content: `Subject: ${subject}\nFrom: ${sender}\n\nContent: ${content}`
      }],
      tools,
      tool_choice: "auto"
    });

    const toolCall = completion.choices[0].message.tool_calls?.[0];
    
    if (toolCall?.function.name === "update_application_status") {
      const parsed = JSON.parse(toolCall.function.arguments);
      return {
        ...parsed,
        date: new Date(),
        emailId: crypto.randomUUID()
      };
    }

    return null;
  }
}