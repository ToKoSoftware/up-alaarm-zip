export type devicePrefix = 'devices';
export type generalPrefix = 'general';

export type EventNamesWithoutPayload =
    // generic
    `${generalPrefix}/start` |
    // escalation starts
    `${generalPrefix}/escalation1/start` |
    `${generalPrefix}/escalation2/start` |
    `${generalPrefix}/escalation3/start` |
    // quest starts
    `${generalPrefix}/escalation1/quest/start` |
    `${generalPrefix}/escalation2/quest/start` |
    `${generalPrefix}/escalation3/quest/start` |

    // generic
    `${generalPrefix}/stop` |
    // escalation stops
    `${generalPrefix}/escalation1/stop` |
    `${generalPrefix}/escalation2/stop` |
    `${generalPrefix}/escalation3/stop` |
    // devices
    `${devicePrefix}/subwoofer/stop` |
    `${devicePrefix}/andon/stop` |
    `${devicePrefix}/speaker/stop` |
    `${devicePrefix}/conveyor/stop` |
    `${devicePrefix}/led-strip/stop` |
    `${devicePrefix}/heat-lamp/start`;

export type EventNamesWithPayload =
    `${devicePrefix}/subwoofer/start` |
    `${devicePrefix}/speaker/start` |
    `${devicePrefix}/vaporizer/start` |
    `${devicePrefix}/led-strip/start` |
    `${devicePrefix}/andon/start` |
    `${devicePrefix}/conveyor/start` |
    `${generalPrefix}/escalation1/quest/stop` |
    `${generalPrefix}/escalation2/quest/stop`;

export type EventNames = EventNamesWithoutPayload | EventNamesWithPayload;
