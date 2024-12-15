import { JobListing } from "@/types/listing";

export abstract class BaseScraper {
  abstract format(data: any): JobListing;
  abstract getJobListings(): Promise<JobListing[]>;
}
