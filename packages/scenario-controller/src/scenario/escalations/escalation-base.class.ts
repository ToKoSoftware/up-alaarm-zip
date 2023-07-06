import {EventNamesWithoutPayload, EventNamesWithPayload, EventPayloads} from '@alaarm/shared';
import {Vars} from "../../vars";
import {sendEvent} from "../../functions/send-event.func";
import {EscalationName} from "../../interfaces/application-state.interface";

export default class EscalationBase implements EscalationImplementation {
    public readonly escalationName: EscalationName = 'Escalation1';
    constructor() {
        Vars.loggy.info('[Scenario] EscalationBase');
    }
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    boot(): void {
    }

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    getQuest(): void {
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

export interface EscalationImplementation {
    escalationName: string;
    boot(): void;
    getQuest(): void;
    shutdown(): void;
}
