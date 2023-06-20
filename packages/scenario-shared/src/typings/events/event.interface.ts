import {devicePrefix, EventNames, EventNamesWithPayload} from './event-names.type';

export interface EventBase {
    id: string;
    timestamp: number;
    type: EventNames;
}

export interface EventWithPayload extends EventBase {
    type: EventNamesWithPayload;
    payload: unknown;
}

export interface EventsWithSoundPayload extends EventBase {
    type: `${devicePrefix}/subwoofer/start` | `${devicePrefix}/speaker/start`;
    payload: {
        soundId: string;
    };
}

export interface EventsWithMachinePayload extends EventBase {
    type: `${devicePrefix}/andon/start`;
    payload: {
        machineId: string;
    };
}

export interface EventsWithIntensity extends EventBase {
    type: `${devicePrefix}/vaporizer/start`;
    payload: {
        intensity: 'light' | 'medium' | 'heavy';
    }
}


export type Event =
    EventsWithSoundPayload |
    EventsWithMachinePayload |
    EventsWithIntensity |
    EventBase;

export type EventPayloads = EventsWithSoundPayload['payload'] |
    EventsWithMachinePayload['payload'] |
    EventsWithIntensity['payload'];
