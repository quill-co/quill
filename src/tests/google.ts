import { GoogleScraper } from "@/lib/scrapers/google";

const scraper = new GoogleScraper();

(async () => {
  const listings = await scraper.getJobListings();

  console.log(listings);
})();
