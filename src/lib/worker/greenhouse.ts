import { JobListing } from "@/types/listing";
import { BaseWorker } from "./base";

export default class GreenhouseWorker extends BaseWorker {
  constructor() {
    super();
  }

  async apply(listing: JobListing): Promise<void> {
    if (listing.recruiter !== "greenhouse") {
      throw new Error(
        "Listing passed to Greenhouse worker but platform is not Greenhouse",
      );
    }

    this.log(`Processing listing: ${listing.title}`);
  }
}
