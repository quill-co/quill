import { JobListing, JobListingSchema } from "@/types/listing";
import { BaseScraper } from "./base";
import { Stagehand } from "@browserbasehq/stagehand";
import env from "@/lib/env";
import { z } from "zod";

export class GoogleScraper extends BaseScraper {
  private query: string;
  private stagehand: Stagehand;

  constructor() {
    super();
    this.query =
      "united states software intern apply site:boards.greenhouse.io";
    this.stagehand = new Stagehand({
      apiKey: env.BROWSERBASE_API_KEY,
      env: env.ENV === "development" ? "LOCAL" : "BROWSERBASE",
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
      instruction: "extract all job listings from the page",
      schema: z.object({
        listings: z.array(JobListingSchema),
      }),
    });

    return listings;
  }
}
