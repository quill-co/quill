import { db } from "@/lib/db";
import { EmailResponse } from "@/types/mail";

(async () => {
  try {
    await db.init();
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

    const application = await db.updateApplication(testResponse);
    console.log("Application updated:", application);

    // Test getting all applications
    const applications = await db.getApplications();
    console.log("All applications:", applications);

    await db.close();
  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  }
})();
