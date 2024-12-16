import logger from "@/lib/logger";
import { LLMType } from "@/types/mail";
import { OpenAIProvider } from "./ai/openai-provider";
import { AnthropicProvider } from "./ai/anthropic-provider";
import { Client, Config, Mail } from "@quill-co/mailstream";

export abstract class BaseMailWorker {
  protected client!: Client;
  protected checkInterval: NodeJS.Timeout | null = null;
  private workerId: string;
  protected aiProvider: OpenAIProvider | AnthropicProvider;

  constructor(
    protected config: Config,
    provider: LLMType = LLMType.OpenAI
  ) {
    this.workerId = crypto.randomUUID();
    this.aiProvider = provider === LLMType.OpenAI ? 
      new OpenAIProvider() : 
      new AnthropicProvider();
  }

  protected log(message: string) {
    logger.info(`[Mail:${this.workerId}] ${message}`);
  }

  async init() {
    this.client = await Client.create(this.config);
    this.log("Mail worker initialized");
    
    await this.startListening();
  }

  private async startListening() {
    this.client.on("mail", this.processMail.bind(this));
    await this.client.getUnseenMails();
    
    this.checkInterval = setInterval(async () => {
      try {
        await this.client.getUnseenMails();
      } catch (error) {
        logger.error(`Error checking mail: ${error}`);
      }
    }, 60000); // Check every minute
  }

  async stop() {
    if (this.checkInterval) {
      clearInterval(this.checkInterval);
    }
    if (this.client) {
      await this.client.close();
    }
    this.log("Mail worker stopped");
  }

  private async processMail(mail: Mail) {
    try {
      await this.handleMail(mail);
    } catch (error) {
      logger.error(`Error processing mail: ${error}`);
    }
  }

  abstract handleMail(mail: Mail): Promise<void>;
}