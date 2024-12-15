import GreenhouseWorker from "@/lib/worker/greenhouse";

const worker = new GreenhouseWorker();

(async () => {
  await worker.init();
  await worker.apply({
    title: "Desktop Software Engineer Intern (Summer 2025)",
    company: "Formlabs",
    location: "Somerville, MA",
    description: "Work on the Formlabs desktop software",
    url: "https://careers.formlabs.com/job/6250770/apply/?gh_jid=6250770",
    recruiter: "greenhouse",
  });
  await worker.finish();
})();
