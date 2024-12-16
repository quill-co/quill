import MailWorker from "@/lib/mail/worker";
import { LLMType, MailboxProvider } from "@/types/mail";

const worker = new MailWorker(LLMType.OpenAI, MailboxProvider.Gmail);

(async () => {
  try {
    await worker.init();
    console.log("Mail worker initialized successfully");

    // The worker will automatically start monitoring emails
    // Keep the process running to continue monitoring
    process.on("SIGINT", async () => {
      console.log("Shutting down mail worker...");
      await worker.stop();
      process.exit(0);
    });
  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  }
})();
