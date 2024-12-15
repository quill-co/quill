import logger from "./lib/logger";
import { GoogleScraper } from "./lib/scrapers/google";
import { IndeedScraper } from "./lib/scrapers/indeed";
import { ScraperManager } from "./lib/scrapers/manager";

async function main() {
  logger.info("Starting Quill");

  const scraperManager = new ScraperManager([new IndeedScraper()]);
  await scraperManager.startScrapers();
}

main();
