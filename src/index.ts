import { profile } from "./config/profile";
import { GoogleScraper } from "./lib/scrapers/google";
import { ScraperManager } from "./lib/scrapers/manager";

async function main() {
  const scraperManager = new ScraperManager([new GoogleScraper(profile)]);
  await scraperManager.startScrapers();
}

main();
