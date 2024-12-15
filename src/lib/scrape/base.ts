import { JobListing } from "@/types/listing";
import { Profile } from "@/types/profile";

export abstract class BaseScraper {
  public profile: Profile;

  constructor(profile: Profile) {
    this.profile = profile;
  }

  abstract getJobListings(): Promise<JobListing[]>;
}
