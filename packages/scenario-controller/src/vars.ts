import Loggy from './functions/loggy.func';
import {Configuration} from './interfaces/configuration.interface';
import {ApplicationState, ScenarioConfiguration} from '@alaarm/shared';
import {Client} from 'mqtt';


export abstract class Vars {
    public static loggy: Loggy;
    public static config: Configuration = require('../config.json');
    public static applicationState: ApplicationState = getDefaultState();
    static currentScenarioConfiguration: ScenarioConfiguration;
    public static mqttClient: Client;
}

export function getDefaultState() {
    return {
        currentEscalation: null,
        currentMachine: null,
        scenarioRunning: false,
        currentQuest: null,
    };
}

export function resetState() {
    Vars.applicationState = getDefaultState();
}
