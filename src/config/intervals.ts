// Intervals in hours

import { GoogleScraper } from "@/lib/scrapers/google";
import { IndeedScraper } from "@/lib/scrapers/indeed";

export const INTERVALS = {
  [GoogleScraper.name]: 1,
  [IndeedScraper.name]: 1,
} as const;
