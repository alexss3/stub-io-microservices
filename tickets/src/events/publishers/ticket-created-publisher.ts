import { Publisher, Subjects, TicketCreatedEvent } from '@stub-io/common';

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
    readonly subject = Subjects.TicketCreated;
}