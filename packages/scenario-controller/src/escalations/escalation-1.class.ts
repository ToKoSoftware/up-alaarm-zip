import EscalationBase from './escalation-base.class';

export default class Escalation1 extends EscalationBase {
    public readonly escalationName: string = 'escalation1';

    boot() {
        super.boot();
        this.emit('devices/conveyor/start');
        setTimeout(() => {
            this.emitWithPayload('devices/speaker/start', {soundId: 'escalation1'});
            this.emitWithPayload('devices/subwoofer/start', {soundId: 'escalation1'});
            this.emitWithPayload('devices/andon/start', {machineId: 'escalation1'});
            this.emit('devices/conveyor/stop');
        }, 5000);
    }

    getQuest() {
        super.getQuest();
    }

    run() {
        super.run();
    }

    shutdown() {
        super.shutdown();
    }
}
