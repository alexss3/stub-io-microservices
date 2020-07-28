import { Publisher, Subjects, TicketUpdatedEvent } from '@stub-io/common';

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
    readonly subject = Subjects.TicketUpdated;
}