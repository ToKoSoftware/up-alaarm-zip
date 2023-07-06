import express, {NextFunction, Request, Response} from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import {wrapResponse} from '../functions/wrap-response.func';
import {CustomError, errorHandler} from '../../middleware/error-handler';
import {Vars} from '../vars';
export default function startServer(): void {

    /**
     * Setup
     */
    const app = express();
    app.use(cors());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());


    /**
     * Routes
     */
    app.get('/api/v1', (req, res) => res.send(wrapResponse(true)));


    /**
     * ErrorHandler
     */
    app.use((err: CustomError, req: Request, res: Response, next: NextFunction) => { errorHandler(err, req, res, next); });

    /**
     * Server
     */
    const port = Vars.config.rest.port;
    app.listen(port, () => Vars.loggy.log(`[REST] Starting on http://localhost:${port}`));
}
