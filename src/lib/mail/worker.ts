import env from "@/lib/env";
import { BaseMailWorker } from "./base";
import { MailboxProvider } from "@/types/mail";
import { Config, Mail } from "@quill-co/mailstream";
import { updateApplication } from "@/lib/db";
import { mailConfig } from "@/config/mail.example";
import { hosts } from "./hosts";
import { LLMType } from "@/types/llm";

export default class MailWorker extends BaseMailWorker {
  constructor(
    provider: LLMType,
    emailProvider: MailboxProvider = MailboxProvider.Gmail,
  ) {
    const config: Config = {
      host: hosts[emailProvider],
      port: 993,
      email: mailConfig.email,
      password: mailConfig.password,
      debug: { enabled: env.ENV === "development" },
    };

    super(config, provider);
  }

  async init() {
    await super.init();
  }

  async handleMail(mail: Mail): Promise<void> {
    this.log(`Processing email from ${mail.from[0].address}`);

    const content = mail.plain?.toString() || "";
    const subject = mail.subject || "";
    const sender = mail.from[0].address || "";

    const response = await this.LLMProvider.analyzeEmail(
      content,
      subject,
      sender,
    );

    if (response) {
      await updateApplication(response);
      this.log(`Updated application status: ${JSON.stringify(response)}`);
    }
  }

  async stop() {
    await super.stop();
  }
}
