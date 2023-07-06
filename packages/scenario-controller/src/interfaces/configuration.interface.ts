export interface Configuration {
    secret: string;
    mqtt: MqttConfiguration;
    rest: RestConfiguration;
}

export interface RestConfiguration {
    port: number;
}

export interface MqttConfiguration {
    host: string;
    port: number;
    username: string;
    password: string;
}
