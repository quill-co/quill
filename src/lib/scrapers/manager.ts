import logger from "../logger";
import { BaseScraper } from "./base";
import { INTERVALS } from "@/config/intervals";

export class ScraperManager {
  private scrapers: BaseScraper[] = [];

  constructor(scrapers: BaseScraper[]) {
    this.scrapers.push(...scrapers);
  }

  async startScrapers() {
    logger.info("Starting scrapers");

    for (const scraper of this.scrapers) {
      const interval = INTERVALS[scraper.constructor.name];

      if (interval === undefined || interval < 0.05) {
        throw new Error(
          `Interval for ${scraper.constructor.name} is undefined`,
        );
      }

      logger.info(`Scraping job listings using ${scraper.constructor.name}`);
      scraper.getJobListings();

      setInterval(
        async () => {
          logger.info(
            `Scraping job listings using ${scraper.constructor.name}`,
          );

          await scraper.getJobListings();
        },
        interval * 60 * 60 * 1000,
      );
    }
  }
}
