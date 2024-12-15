import env from "@/lib/env";
import { JobListing, JobListingSchema } from "@/types/listing";
import { Profile } from "@/types/profile";
import { Stagehand } from "@browserbasehq/stagehand";
import { z } from "zod";
import { BaseScraper } from "./base";

export class GoogleScraper extends BaseScraper {
  private query: string;
  private stagehand: Stagehand;

  constructor(profile: Profile) {
    super(profile);
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
