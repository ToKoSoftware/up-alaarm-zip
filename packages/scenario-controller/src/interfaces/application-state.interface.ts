import {EscalationImplementation} from '../scenario/escalations/escalation-base.class';

export interface ApplicationState {
    currentEscalation: EscalationImplementation | null;
    scenarioRunning: boolean;
    currentQuest: QuestName | null;
}

export type EscalationName = 'Escalation1' | 'Escalation2' | 'Escalation3';
export type QuestName = 'Numbers' | 'Reaction';
