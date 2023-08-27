import express, {NextFunction, Request, Response} from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import {wrapResponse} from '../functions/wrap-response.func';
import {CustomError, errorHandler} from '../../middleware/error-handler';
import {resetState, Vars} from '../vars';
import {AlaarmErrors} from '../enums/errors';
import Escalation1 from '../scenario/escalations/escalation-1.class';
import Escalation2 from '../scenario/escalations/escalation-2.class';
import Escalation3 from '../scenario/escalations/escalation-3.class';

export default function startServer(): void {

    /**
     * Setup
     */
    const app = express();
    app.use(cors());
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(bodyParser.json());


    /**
     * Routes
     */
    app.get('/api/v1', (req, res) => res.send(wrapResponse(true)));
    app.post('/api/v1/scenario/start', (req, res) => {
        if (Vars.applicationState.scenarioRunning) {
            throw new CustomError(AlaarmErrors.SCENARIO_ALREADY_RUNNING, 400);
        }
        res.send(wrapResponse(true));
        Vars.applicationState.scenarioRunning = true;
        const escalation1 = new Escalation1();
        escalation1.boot();
    });

    app.post('/api/v1/scenario/stop', (req, res) => {
        Vars.applicationState.currentEscalation?.shutdown();
        resetState();
        res.send(wrapResponse(true, Vars.applicationState));
    });

    app.get('/api/v1/scenario/quest', (req, res) => {
        res.send(wrapResponse(true, {
            currentQuest: Vars.applicationState.currentQuest
        }));
    });

    app.post('/api/v1/scenario/quest', (req, res) => {
        // Attendee has solved the quest
        if (Vars.applicationState.scenarioRunning || !Vars.applicationState.currentEscalation) {
            throw new CustomError(AlaarmErrors.SCENARIO_ALREADY_RUNNING, 400);
        }

        Vars.applicationState.currentEscalation.shutdown();
        switch (Vars.applicationState.currentEscalation?.escalationName) {
        case 'Escalation1':
            Vars.applicationState.currentEscalation = new Escalation2();
            break;
        case 'Escalation2':
            Vars.applicationState.currentEscalation = new Escalation3();
            break;
        case 'Escalation3':
            Vars.applicationState.currentEscalation = null;
            return;
        }
        Vars.applicationState.currentEscalation.boot();
        res.send(wrapResponse(true, Vars.applicationState));
    });

    app.get('/api/v1/state', (req, res) => {
        res.send(wrapResponse(true, Vars.applicationState));
    });


    /**
     * ErrorHandler
     */
    app.use((err: CustomError, req: Request, res: Response, next: NextFunction) => {
        errorHandler(err, req, res, next);
    });

    /**
     * Server
     */
    const port = Vars.config.rest.port;
    app.listen(port, () => Vars.loggy.log(`[REST] Starting on http://localhost:${port}`));
}
