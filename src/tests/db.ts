import { updateApplication, getApplications } from "@/lib/db";
import { EmailResponse } from "@/types/mail";

(async () => {
  try {
    console.log("Database initialized");

    // Test application update
    const testResponse: EmailResponse = {
      company: "Test Company",
      title: "Software Engineer",
      location: "Remote",
      status: "pending",
      date: new Date(),
      emailId: crypto.randomUUID(),
      rawEmail: "Test email content",
    };

    const application = await updateApplication(testResponse);
    console.log("Application updated:", application);

    // Test getting all applications
    const applications = getApplications();
    console.log("All applications:", applications);
  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  }
})();
