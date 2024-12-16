import env from "@/lib/env";
import Anthropic from '@anthropic-ai/sdk';
import { LLMProvider, EmailResponse, ResponseStatusEnum } from "@/types/mail";

export class AnthropicProvider implements LLMProvider {
  private client: Anthropic;

  constructor() {
    this.client = new Anthropic({
      apiKey: env.ANTHROPIC_API_KEY
    });
  }

  async analyzeEmail(content: string, subject: string, sender: string): Promise<EmailResponse | null> {
    const response = await this.client.messages.create({
      model: 'claude-3-opus-20240229',
      max_tokens: 1024,
      temperature: 0,
      system: "You are an AI that analyzes job application emails and updates application statuses.",
      messages: [{
        role: 'user',
        content: `Subject: ${subject}\nFrom: ${sender}\n\nContent: ${content}`
      }],
      tools: [{
        name: "update_application_status",
        description: "Update the job application status in the database",
        input_schema: {
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
      }]
    });

    try {
      const toolUseBlock = response.content.find(
        (block): block is { type: 'tool_use', input: unknown, name: string, id: string } => 
        block.type === 'tool_use'
      );

      if (toolUseBlock?.type === 'tool_use' && toolUseBlock.name === "update_application_status") {
        const input = toolUseBlock.input as {
          company: string;
          title: string;
          status: string;
        };

        // Validate the status using zod
        const status = ResponseStatusEnum.parse(input.status);

        const emailResponse: EmailResponse = {
          company: input.company,
          title: input.title,
          status,
          date: new Date(),
          emailId: crypto.randomUUID()
        };

        return emailResponse;
      }

      return null;
    } catch (error) {
      return null;
    }
  }
}