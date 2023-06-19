import {devicePrefix, EventNames, EventNamesWithPayload} from "./eventType.type";

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
        intensity: "light" | "medium" | "heavy";
    }
}

const test: Event = {
    id: '123',
    timestamp: 123,
    type: 'devices/vaporizer/start',
    payload: {
        intensity: 'medium',
        soundId: '123'
    }
}


export type Event =
    EventsWithSoundPayload |
    EventsWithMachinePayload |
    EventsWithIntensity |
    EventBase;
