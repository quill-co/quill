import { text, sqliteTable, integer } from "drizzle-orm/sqlite-core";
import { ApplicationStatusEnum } from "@/types/applications";

export const applicationStatusFlow = sqliteTable('application_status_flow', {
    id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
    currentStatus: text('current_status', { 
        enum: Object.keys(ApplicationStatusEnum.enum) as [string, ...string[]] 
    }).notNull(),
    nextStatus: text('next_status', { 
        enum: Object.keys(ApplicationStatusEnum.enum) as [string, ...string[]] 
    }),
    createdAt: integer('created_at', { mode: 'timestamp' })
        .notNull()
        .$defaultFn(() => new Date()),
    updatedAt: integer('updated_at', { mode: 'timestamp' })
        .notNull()
        .$defaultFn(() => new Date()),
});