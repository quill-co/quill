import sqlite3 from "sqlite3";
import { open, Database } from "sqlite";
import { Application, EmailResponse, ResponseStatusEnum } from "@/types/mail";

export class DB {
  private db: Database | null = null;
  private readonly validStatuses = ResponseStatusEnum;

  async init() {
    this.db = await open({
      filename: "./applications.db",
      driver: sqlite3.Database,
    });

    await this.createTables();
  }

  private async createTables() {
    if (!this.db) throw new Error("Database not initialized");

    await this.db.exec(`
     CREATE TABLE IF NOT EXISTS applications (
       id TEXT PRIMARY KEY,
       company TEXT NOT NULL,
       title TEXT NOT NULL,
       location TEXT NOT NULL,
       status TEXT NOT NULL
        CHECK (status IN (${Object.values(this.validStatuses.enum).map(s => `'${s}'`).join(', ')})),
       email_id TEXT UNIQUE NOT NULL,
       raw_email TEXT,
       created_at DATETIME NOT NULL,
       updated_at DATETIME NOT NULL
     )
   `);
  }

  async updateApplication(response: EmailResponse): Promise<Application> {
    if (!this.db) throw new Error("Database not initialized");

    const now = new Date();

    await this.db.run(
      `
      INSERT INTO applications (
        id,
        company,
        title,
        location,
        status,
        email_id,
        raw_email,
        created_at,
        updated_at
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      ON CONFLICT(email_id) DO UPDATE SET
        status = excluded.status,
        updated_at = excluded.updated_at,
        raw_email = excluded.raw_email
    `,
      [
        crypto.randomUUID(),
        response.company,
        response.title,
        response.location,
        response.status,
        response.emailId,
        response.rawEmail,
        response.date.toISOString(),
        now.toISOString(),
      ],
    );

    // Get the updated record
    const application = await this.db.get<Application>(
      `
      SELECT * FROM applications WHERE email_id = ?
    `,
      [response.emailId],
    );

    if (!application) {
      throw new Error("Failed to retrieve updated application");
    }

    // Convert string dates to Date objects and validate status
    return {
      ...application,
      status: this.validStatuses.parse(application.status),
      createdAt: new Date(application.createdAt),
      updatedAt: new Date(application.updatedAt),
    };
  }

  async getApplications(): Promise<Application[]> {
    if (!this.db) throw new Error("Database not initialized");

    const applications = await this.db.all<Application[]>(`
      SELECT * FROM applications 
      ORDER BY updated_at DESC
    `);

    return applications.map((app) => ({
      ...app,
      status: this.validStatuses.parse(app.status),
      createdAt: new Date(app.createdAt),
      updatedAt: new Date(app.updatedAt),
    }));
  }

  async getApplicationById(id: string): Promise<Application | null> {
    if (!this.db) throw new Error("Database not initialized");

    const application = await this.db.get<Application>(
      `
      SELECT * FROM applications 
      WHERE id = ?
    `,
      [id],
    );

    if (!application) return null;

    return {
      ...application,
      status: this.validStatuses.parse(application.status),
      createdAt: new Date(application.createdAt),
      updatedAt: new Date(application.updatedAt),
    };
  }

  async close() {
    if (this.db) {
      await this.db.close();
      this.db = null;
    }
  }
}

export const db = new DB();