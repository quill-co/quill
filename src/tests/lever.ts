import GreenhouseWorker from "@/lib/worker/greenhouse";

const worker = new GreenhouseWorker();

(async () => {
  await worker.init();
  await worker.apply({
    title: "2025 Summer Intern - Civil Engineering, Transportation (Rail)",
    company: "TKDA",
    location: "Bloomington, MN",
    description: "Civil Engineering, Transportation (Rail)",
    url: "https://jobs.lever.co/tkda/7b1e51d7-0fb6-4984-b0b1-dd325b5ff583",
    recruiter: "lever",
  });
  await worker.finish();
})();
