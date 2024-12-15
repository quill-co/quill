import { JobListing } from "@/types/listing";
import { BaseWorker } from "./base";
import { z } from "zod";
import path from "path";
import { buildApplyPrompt } from "../prompt";

export default class GreenhouseWorker extends BaseWorker {
  constructor() {
    super();
  }

  async apply(listing: JobListing): Promise<void> {
    this.log(`Applying to ${listing.title} at ${listing.company}`);

    await this.stagehand.page.goto(listing.url);

    // const frame = await this.stagehand.page.locator("#grnhse_iframe");
    // if (frame) {
    //   const attachButton = await frame.locator(
    //     'button[aria-describedby="resume-allowable-file-types"]',
    //   );

    //   this.log("Attaching resume");
    //   const fileChooserPromise =
    //     await this.stagehand.page.waitForEvent("filechooser");

    //   await attachButton.click();

    //   const fileChooser = await fileChooserPromise;

    //   await fileChooser.setFiles(
    //     path.join(__dirname, "..", "..", "config", "resume.pdf"),
    //   );
    // } else {
    //   this.log("No iframe with id 'grnhse_iframe' found");
    // }

    await this.stagehand.act({
      action: buildApplyPrompt(),
    });
  }
}
