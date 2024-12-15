// Intervals in hours

import { GoogleScraper } from "@/lib/scrapers/google";

export const INTERVALS = {
  [GoogleScraper.name]: 1,
} as const;
