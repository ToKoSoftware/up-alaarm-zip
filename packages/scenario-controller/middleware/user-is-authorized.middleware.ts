import {NextFunction, Request, Response} from 'express';
import {wrapResponse} from "../src/functions/wrap-response.func";

export async function userIsAuthorized(req: Request, res: Response, next: NextFunction): Promise<void> {
    // check if request has url parameter called secret
    if (req.query.secret !== undefined) {
        // check if secret is equal to 1234
        if (req.query.secret === '1234') {
            next();
        }
    }
    res.status(401).send(wrapResponse(false, {error: 'Unauthorized!'}));
}
