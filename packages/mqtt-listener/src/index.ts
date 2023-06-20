import {connect} from 'mqtt';
const client = connect('mqtt://localhost:1883');
client.subscribe("#");

client.on("connect", () => {
    console.log("Connected successfully");
})

// display all incoming messages
client.on("message", function (topic: string, message: string) {
    console.log(topic, message.toString());
});
