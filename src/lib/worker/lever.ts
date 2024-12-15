import { JobListing } from "@/types/listing";
import { buildApplyPrompt } from "../prompt";
import { BaseWorker } from "./base";
import { z } from "zod";

export default class LeverWorker extends BaseWorker {
  constructor() {
    super();
  }

  async apply(listing: JobListing): Promise<void> {
    this.log(`Applying to ${listing.title} at ${listing.company}`);

    await this.stagehand.page.goto(listing.url);

    const { isApplicationPage } = await this.stagehand.extract({
      instruction:
        "Determine if the current page is an application page or if we need to navigate to the application page",
      schema: z.object({
        isApplicationPage: z.boolean(),
      }),
    });

    if (!isApplicationPage) {
      await this.stagehand.act({
        action: "navigate to the application page",
      });
    }

    await this.stagehand.act({
      action: buildApplyPrompt(),
    });
  }
}
