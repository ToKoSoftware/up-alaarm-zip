export interface Configuration {
    secret: string;
    mqtt: MqttConfiguration;
}

export interface MqttConfiguration {
    host: string;
    port: number;
    username: string;
    password: string;
}
