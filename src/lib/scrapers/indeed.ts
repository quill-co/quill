import env from "@/lib/env";
import { JobListing, JobListingSchema } from "@/types/listing";
import { Stagehand } from "@browserbasehq/stagehand";
import { z } from "zod";
import logger from "../logger";
import { buildActionPrompt, buildExtractionPrompt } from "../prompt";
import { BaseScraper } from "./base";

export class IndeedScraper extends BaseScraper {
  private stagehand: Stagehand;

  constructor() {
    super();
    this.stagehand = new Stagehand({
      apiKey: env.BROWSERBASE_API_KEY,
      projectId: env.BROWSERBASE_PROJECT_ID,
      env: env.BROWSER_ENV,
    });
  }

  async getJobListings(): Promise<JobListing[]> {
    await this.stagehand.init();

    await this.stagehand.page.goto("https://www.indeed.com/");

    let refreshCount = 0;
    const maxRefreshes = 5;

    while (true) {
      const { isStuck } = await this.stagehand.extract({
        instruction: "extract if the page is stuck on a captcha",
        schema: z.object({
          isStuck: z.boolean(),
        }),
      });

      if (isStuck) {
        if (refreshCount >= maxRefreshes) {
          logger.error("Maximum refresh attempts reached, quitting...");
          break;
        }
        logger.error("Page is stuck on CF captcha, refreshing...");
        try {
          await this.stagehand.page.reload();
          refreshCount++;
        } catch (error) {
          logger.error("Failed to reload page, retrying...");
        }
        await new Promise((resolve) => setTimeout(resolve, 15000));
      } else {
        break;
      }
    }

    await this.stagehand.act({
      action: buildActionPrompt(),
    });

    const { listings } = await this.stagehand.extract({
      instruction: buildExtractionPrompt(),
      schema: z.object({
        listings: z.array(JobListingSchema),
      }),
    });

    logger.info(`Found ${listings.length} job listings`);
    console.log(listings);

    await this.stagehand.close();

    return listings;
  }
}
