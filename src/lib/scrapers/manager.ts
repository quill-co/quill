import logger from "../logger";
import { BaseScraper } from "./base";
import { INTERVALS } from "@/config/intervals";

export class ScraperManager {
  private scrapers: BaseScraper[] = [];

  constructor(scrapers: BaseScraper[]) {
    this.scrapers.push(...scrapers);
  }

  async startScrapers() {
    for (const scraper of this.scrapers) {
      const interval = INTERVALS[scraper.constructor.name];

      setInterval(
        async () => {
          logger.info(
            `Scraping job listings from ${scraper.constructor.name} scraper`,
          );

          await scraper.getJobListings();
        },
        interval * 60 * 60 * 1000,
      );
    }
  }
}
