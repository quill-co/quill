import logger from "./lib/logger";
import { GoogleScraper } from "./lib/scrapers/google";
import { IndeedScraper } from "./lib/scrapers/indeed";
import { ScraperManager } from "./lib/scrapers/manager";

async function main() {
  logger.info("Starting Quill");

  await new ScraperManager([new IndeedScraper()]).startScrapers();
}

main();
