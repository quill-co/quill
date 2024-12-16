import env from "@/lib/env";
import { BaseMailWorker } from "./base";
import { LLMType, MailboxProvider } from "@/types/mail";
import { Config, Mail } from "@quill-co/mailstream";
import { db } from "@/lib/db";

export default class MailWorker extends BaseMailWorker {
  constructor(
    mailConfig: Config,
    provider: LLMType = LLMType.OpenAI,
    emailProvider: MailboxProvider = MailboxProvider.Gmail
  ) {
    let config: Config;
    
    if (emailProvider === MailboxProvider.Gmail) {
      config = {
        host: "imap.gmail.com",
        port: 993,
        email: mailConfig.email,
        password: mailConfig.password,
        debug: { enabled: env.ENV === "development" },
      };
    } else {
      config = {
        host: "outlook.office365.com",
        port: 993,
        email: mailConfig.email,
        password: mailConfig.password,
        debug: { enabled: env.ENV === "development" },
      };
    }
    
    super(config, provider);
  }

  async init() {
    await db.init();
    await super.init();
  }

  async handleMail(mail: Mail): Promise<void> {
    this.log(`Processing email from ${mail.from[0].address}`);

    const content = mail.plain?.toString() || '';
    const subject = mail.subject || '';
    const sender = mail.from[0].address || '';

    const response = await this.aiProvider.analyzeEmail(content, subject, sender);
    
    if (response) {
      await db.updateApplication(response);
      this.log(`Updated application status: ${JSON.stringify(response)}`);
    }
  }

  async stop() {
    await super.stop();
    await db.close();
  }
}