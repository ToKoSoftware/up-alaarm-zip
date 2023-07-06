import {connect} from 'mqtt';
import {Vars} from './src/vars';
import Loggy from './src/functions/loggy.func';
import Escalation1 from './src/escalations/escalation-1.class';
import startServer from './src/rest/start-server';

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

    const escalation1 = new Escalation1();
    //const escalation2 = new Escalation2();
    //const escalation3 = new Escalation3();
    let scenarioRunning = true;
    while (scenarioRunning) {
        escalation1.boot();
        scenarioRunning = false;
    }
}

try {
    main();
} catch (e) {
    Vars.loggy.error(e);
}
