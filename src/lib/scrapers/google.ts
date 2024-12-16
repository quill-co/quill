import env from "@/lib/env";
import { JobListing, JobListingSchema } from "@/types/listing";
import { Stagehand } from "@browserbasehq/stagehand";
import { z } from "zod";
import logger from "../logger";
import { buildExtractionPrompt } from "../prompt";
import { BaseScraper } from "./base";

export class GoogleScraper extends BaseScraper {
  private query: string;
  private stagehand: Stagehand;

  constructor() {
    super();
    this.query =
      "united states software intern apply site:boards.greenhouse.io";
    this.stagehand = new Stagehand({
      apiKey: env.BROWSERBASE_API_KEY,
      projectId: env.BROWSERBASE_PROJECT_ID,
      env: env.BROWSERBASE_ENV,
    });
  }

  private buildSearchUrl(query: string): string {
    const encodedQuery = encodeURIComponent(query);
    return `https://www.google.com/search?q=${encodedQuery}`;
  }

  async getJobListings(): Promise<JobListing[]> {
    await this.stagehand.init();

    const searchUrl = this.buildSearchUrl(this.query);

    await this.stagehand.page.goto(searchUrl);

    const { listings } = await this.stagehand.extract({
      instruction: buildExtractionPrompt(),
      schema: z.object({
        listings: z.array(JobListingSchema),
      }),
      useTextExtract: true,
    });

    logger.info(`Found ${listings.length} job listings`);
    console.log(listings);

    await this.stagehand.close();

    return listings;
  }
}
