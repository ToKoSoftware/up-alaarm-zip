import EscalationBase from './escalation-base.class';
import {Vars} from '../../vars';
import {EscalationName} from '@alaarm/shared';

export default class Escalation3 extends EscalationBase {
    public readonly escalationName: EscalationName = 'Escalation3';

    boot() {
        super.boot();
        this.emit('devices/conveyor/start');
        this.emitWithPayload('devices/speaker/start', {soundId: 'escalation1'});
        this.emitWithPayload('devices/subwoofer/start', {soundId: 'escalation1'});
        this.emitWithPayload('devices/andon/start', {machineId: 'escalation1'});
        setTimeout(() => {
            this.emit('devices/conveyor/stop');
            Vars.applicationState.currentQuest = this.getQuest();
            Vars.applicationState.currentMachine = 'machine-3';
        }, 5000);
    }

    getQuest() {
        return super.getQuest();
    }

    shutdown() {
        super.shutdown();
    }
}
