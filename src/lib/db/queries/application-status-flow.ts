import { db } from '../client';
import { applicationStatusFlow } from '../schema/application-status-flow';
import { eq, and } from 'drizzle-orm';
import { ApplicationStatusEnum } from '@/types/applications';
import { z } from 'zod';

export type StatusTransition = {
    id: string;
    currentStatus: z.infer<typeof ApplicationStatusEnum>;
    nextStatus: z.infer<typeof ApplicationStatusEnum> | null;
    createdAt: Date;
    updatedAt: Date;
};

const mapToStatusTransition = (row: typeof applicationStatusFlow.$inferSelect): StatusTransition => ({
    ...row,
    currentStatus: row.currentStatus as z.infer<typeof ApplicationStatusEnum>,
    nextStatus: row.nextStatus as z.infer<typeof ApplicationStatusEnum> | null,
    createdAt: new Date(row.createdAt),
    updatedAt: new Date(row.updatedAt),
});

export function getValidNextStatuses(currentStatus: z.infer<typeof ApplicationStatusEnum>): StatusTransition[] {
    const results = db
        .select()
        .from(applicationStatusFlow)
        .where(and(
            eq(applicationStatusFlow.currentStatus, currentStatus)
        ))
        .all();

    return results.map(mapToStatusTransition);
}

export function isValidTransition(
    currentStatus: z.infer<typeof ApplicationStatusEnum>,
    proposedStatus: z.infer<typeof ApplicationStatusEnum>
): boolean {
    const result = db
        .select()
        .from(applicationStatusFlow)
        .where(and(
            eq(applicationStatusFlow.currentStatus, currentStatus),
            eq(applicationStatusFlow.nextStatus, proposedStatus)
        ))
        .get();

    return !!result;
}

export function initializeStatusFlow() {
    const transitions = [
        { currentStatus: 'pending', nextStatus: 'under_review' },
        { currentStatus: 'under_review', nextStatus: 'interview' },
        { currentStatus: 'interview', nextStatus: 'offer' },
        { currentStatus: 'interview', nextStatus: 'rejected' },
        { currentStatus: 'offer', nextStatus: null },
        { currentStatus: 'rejected', nextStatus: null },
    ] as const;

    transitions.forEach(transition => {
        db.insert(applicationStatusFlow)
            .values({
                currentStatus: transition.currentStatus,
                nextStatus: transition.nextStatus,
            })
            .onConflictDoNothing()
            .run();
    });
}