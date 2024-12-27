import { db } from '../client';
import { applications } from '../schema/applications';
import { eq } from 'drizzle-orm';
import  { EmailResponse, Application, ResponseStatusEnum } from '@/types/mail';
import { z } from 'zod';

// Helper to convert DB row to Application type
const mapToApplication = (row: typeof applications.$inferSelect): Application => ({
    ...row,
    createdAt: new Date(row.createdAt),
    updatedAt: new Date(row.updatedAt),
    status: row.status as z.infer<typeof ResponseStatusEnum>,
    rawEmail: row.rawEmail ?? undefined,
});

export async function updateApplication(response: EmailResponse): Promise<Application> {
  const now = new Date();
  
  const result = db
    .insert(applications)
    .values([{
      id: crypto.randomUUID(),
      company: response.company,
      title: response.title,
      location: response.location,
      status: response.status,
      emailId: response.emailId,
      rawEmail: response.rawEmail ?? null,
      createdAt: response.date,
      updatedAt: now,
    }])
    .onConflictDoUpdate({
      target: applications.emailId,
      set: {
        status: response.status,
        updatedAt: now, 
        rawEmail: response.rawEmail,
      },
    })
    .returning()
    .get();

  if (!result) {
    throw new Error("Failed to retrieve updated application");
  }

  return mapToApplication(result);
}

export function getApplications(): Application[] {
  const results = db
    .select()
    .from(applications)
    .orderBy(applications.updatedAt)
    .all();

  return results.map(mapToApplication);
}

export function getApplicationById(id: string): Application | null {
  const result = db
    .select()
    .from(applications)
    .where(eq(applications.id, id))
    .get();

  return result ? mapToApplication(result) : null;
}