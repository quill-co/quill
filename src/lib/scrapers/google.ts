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
      instruction: `This is the profile of a job seeker: ${
        (JSON.stringify(this.profile), null, 2)
      }.\n\nextract all job listings from the page that are relevant to the profile of the job seeker. it's okay if they aren't an exact match, but they should be a good fit.`,
      schema: z.object({
        listings: z.array(JobListingSchema),
      }),
    });

    return listings;
  }
}
