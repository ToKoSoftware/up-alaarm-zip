import {connect} from "mqtt";

function main() {

    /**
     * Prevent node from crashing
     */
    process.on('uncaughtException', function (error) {
        console.log(error.stack);
    });
    const client = connect('mqtt://' + process.env.MQTT_HOSTNAME);


    console.log("Connecting to MQTT on", config.MQTT_HOSTNAME);
    client.publish("/test", JSON.stringify({
        test: "Test"
    }));
}

main();
