import { profile } from "@/config/profile";
import { JobListing } from "@/types/listing";
import path from "path";
import { z } from "zod";
import { BaseWorker } from "./base";

const selectorMap = {
  "input[name='name']": profile.name,
  "input[name='email']": profile.contactInfo.email,
  "input[name='phone']": profile.contactInfo.phone,
  "#location-input": `${profile.contactInfo.address.city}, ${profile.contactInfo.address.state}`,
  "input[name='urls[LinkedIn]']": profile.contactInfo.linkedin,
  "input[name='urls[GitHub]']": profile.contactInfo.github,
  "input[name='urls[Twitter]']": profile.contactInfo.twitter,
  "input[name='urls[Portfolio]']": profile.contactInfo.website,
  "input[name='urls[Other]']": profile.contactInfo.website,
};

export default class LeverWorker extends BaseWorker {
  constructor() {
    super();
  }

  async apply(listing: JobListing): Promise<void> {
    this.log(`Applying to ${listing.title} at ${listing.company}`);

    const { page } = this.stagehand;

    await page.goto(listing.url);

    const { isApplicationPage } = await page.extract({
      instruction:
        "Determine if the current page is an application page or if we need to navigate to the application page",
      schema: z.object({
        isApplicationPage: z.boolean(),
      }),
    });

    if (!isApplicationPage) {
      await page.act({
        action: "navigate to the application page",
      });
    }

    const uploadResumeButton = await page.$("#resume-upload-input");

    if (uploadResumeButton?.isVisible()) {
      const fileChooserPromise = page.waitForEvent("filechooser");
      await uploadResumeButton.click();
      const fileChooser = await fileChooserPromise;
      await fileChooser.setFiles(
        path.join(process.cwd(), "src", "config", "resume.pdf"),
      );
    }

    for (const [selector, value] of Object.entries(selectorMap)) {
      if (!value) {
        continue;
      }

      const element = await page.$(selector);
      if (element?.isVisible()) {
        await element.fill(value);
      }
    }

    await page.act({
      action: `if there is a question about sponsorship, select ${profile.needsSponsorship ? "Yes" : "No"}`,
    });

    await page.act({
      action: `if there is a question about race, select ${profile.race}`,
    });

    await page.act({
      action: `if there is a question about protected veteran status, select ${profile.protectedVeteran ? "Yes" : "No"}`,
    });
  }
}
