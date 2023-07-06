import {Vars} from '../vars';
import {Event, EventNames, EventPayloads, EventWithPayload} from '@alaarm/shared';
import {v4 as uuidv4} from 'uuid';

export function sendEvent(topic: EventNames, data: EventPayloads | null) {
    Vars.loggy.info('[MQTT] Sending data to topic', topic, 'with data', data);
    const event: Event = {
        id: uuidv4(),
        timestamp: Date.now().toLocaleString() as any,
        type: topic,
    };
    if (data) {
        (event as EventWithPayload).payload = data;
    }
    Vars.mqttClient.publish(`/${topic}`, JSON.stringify(event));
}
