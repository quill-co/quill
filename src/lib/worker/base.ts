import logger from "@/lib/logger";
import { JobListing } from "@/types/listing";
import { Stagehand } from "@browserbasehq/stagehand";
import env from "../env";

export abstract class BaseWorker {
  private workerId: string;
  public stagehand: Stagehand;

  constructor() {
    this.workerId = crypto.randomUUID();
    this.stagehand = new Stagehand({
      apiKey: env.BROWSERBASE_API_KEY,
      projectId: env.BROWSERBASE_PROJECT_ID,
      env: env.BROWSERBASE_ENV,
    });
  }

  async init() {
    await this.stagehand.init();
  }

  log(message: string) {
    logger.info(`[${this.workerId}] ${message}`);
  }

  async finish() {
    logger.info("Worker finished");
  }

  abstract apply(listing: JobListing): Promise<void>;
}
