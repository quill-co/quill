import { JobListing } from "@/types/listing";
import PQueue from "p-queue";
import GreenhouseWorker from "./worker/greenhouse";
import { BaseWorker } from "./worker/base";

export const queue = new PQueue({ concurrency: 1 });

export const enqueueListing = async (listing: JobListing) => {
  let worker: BaseWorker;

  switch (listing.recruiter) {
    case "greenhouse":
      worker = new GreenhouseWorker();
      break;
    default:
      throw new Error("Unsupported recruiter");
  }

  if (!worker) {
    throw new Error(`Unsupported recruiter: ${listing.recruiter}`);
  }

  await queue.add(async () => {
    await worker.init();
    await worker.apply(listing);
    await worker.finish();
  });
};
