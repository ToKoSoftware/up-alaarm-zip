export interface ScenarioConfiguration {
    general: GeneralConfiguration;
    escalation1: EscalationConfiguration;
    escalation2: EscalationConfiguration;
    escalation3: EscalationConfiguration;
}

export interface GeneralConfiguration {
    timeBeforeScenarioStarts: number;
    attendingPersons: number;
}

export interface EscalationConfiguration {
    soundForSubwoofer: string;
    soundForAlarm: string;
    machineToRepair: string;
    repairQuest: QuestConfiguration;
}

export interface QuestConfiguration {
    questId: string;
    successfulRepairLeadsToScenarioEnd: boolean;
    solvingTime: number;
}
