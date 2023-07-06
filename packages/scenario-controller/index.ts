import {connect} from 'mqtt';
import {Vars} from './src/vars';
import Loggy from './src/functions/loggy.func';
import startServer from './src/rest/start-server';
import Escalation1 from './src/scenario/escalations/escalation-1.class';

function main() {

    Vars.loggy = new Loggy();

    /**
     * Prevent node from crashing
     */
    process.on('uncaughtException', function (error) {
        Vars.loggy.error(error.stack);
    });
    Vars.mqttClient = connect('mqtt://' + Vars.config.mqtt.host + ':' + Vars.config.mqtt.port);
    Vars.mqttClient.on('connect', () => {
        Vars.loggy.info('[MQTT] Connected successfully');
    });

    Vars.loggy.log('[MQTT] Connecting to MQTT on', Vars.config.mqtt.host);


    Vars.mqttClient.publish('/test',
        JSON.stringify({
            test: 'Test'
        })
    );

    startServer();
}

try {
    main();
} catch (e) {
    Vars.loggy.error(e);
}
