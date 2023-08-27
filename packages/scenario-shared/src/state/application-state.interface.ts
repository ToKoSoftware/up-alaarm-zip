export interface ApplicationState {
    currentEscalation: EscalationImplementation | null;
    scenarioRunning: boolean;
    currentMachine: string | null;
    currentQuest: QuestName | null;
}

export type EscalationName = 'Escalation1' | 'Escalation2' | 'Escalation3';
export type QuestName = 'Numbers' | 'Reaction';

export interface EscalationImplementation {
    escalationName: string;
    boot(): void;
    getQuest(): QuestName;
    shutdown(): void;
}
