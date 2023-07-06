import {sendEvent} from '../functions/send-event.func';
import {EventNamesWithoutPayload, EventNamesWithPayload, EventPayloads} from '@alaarm/shared';
import {Vars} from '../vars';

export default class EscalationBase implements EscalationImplementation {
    public readonly escalationName: string = 'escalation_base';
    constructor() {
        Vars.loggy.info('[Scenario] EscalationBase');
    }
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    boot(): void {
    }

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    getQuest(): void {
    }

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    run(): void {
    }

    shutdown(): void {
        sendEvent(`general/${this.escalationName}/stop` as any, null);
    }

    emit(eventName: EventNamesWithoutPayload) {
        Vars.loggy.info(`[Scenario] EscalationBase.emit: ${eventName}`);
        sendEvent(eventName, null);
    }
    emitWithPayload(eventName: EventNamesWithPayload, payload: EventPayloads) {
        Vars.loggy.info(`[Scenario] EscalationBase.emit: ${eventName}`);
        sendEvent(eventName, payload);
    }
}

interface EscalationImplementation {
    escalationName: string;
    boot(): void;
    run(): void;
    getQuest(): void;
    shutdown(): void;
}
