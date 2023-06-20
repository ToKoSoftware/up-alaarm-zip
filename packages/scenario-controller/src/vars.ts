import Loggy from './functions/loggy.func';
import {Configuration} from './interfaces/configuration.interface';
import {ScenarioConfiguration} from '@alaarm/shared';
import {Client} from 'mqtt';


export abstract class Vars {
    public static loggy: Loggy;
    public static config: Configuration = require('../config.json');
    public static applicationState: Configuration = require('../config.json');
    public static currentScenarioConfiguration: ScenarioConfiguration;
    public static mqttClient: Client;
}
