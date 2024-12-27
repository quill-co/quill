import { text, sqliteTable, integer } from "drizzle-orm/sqlite-core";
import { ResponseStatusEnum } from "@/types/mail";

export const applications = sqliteTable('applications', {
    id: text('id').primaryKey(),
    company: text('company').notNull(),
    title: text('title').notNull(),
    location: text('location').notNull(),
    status: text('status', { enum: Object.keys(ResponseStatusEnum.enum) as [string, ...string[]] }).notNull(),
    emailId: text('email_id').notNull().unique(),
    rawEmail: text('raw_email'),
    createdAt: integer('created_at', { mode: 'timestamp' })
        .notNull()
        .$defaultFn(() => new Date()),
    updatedAt: integer('updated_at', { mode: 'timestamp' })
        .notNull()
        .$defaultFn(() => new Date()),
});