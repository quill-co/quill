import { JobListing } from "@/types/listing";

export abstract class BaseScraper {
  constructor() {}

  abstract getJobListings(): Promise<JobListing[]>;
}
