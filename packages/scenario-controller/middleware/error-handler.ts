import {NextFunction, Request, Response} from 'express';
import {AlaarmErrors} from "../src/enums/errors";
import {wrapResponse} from "../src/functions/wrap-response.func";
import {ErrorHandler} from "../src/interfaces/error-handler-interface";


export class CustomError extends Error {
    public name = 'CustomError';
    constructor(public errorEnumMessage: AlaarmErrors, public statusCode: number, public additionalContext = '') {
        super();
    }
}

type ErrorHandlerInterface = (err: CustomError, req: Request, res: Response, next: NextFunction) => unknown;


export const errorHandler: ErrorHandlerInterface = (err, req, res,) => {
    if (!err) return;
    let error: ErrorHandler;
    if (err.name === 'CustomError') {
        error = {
            success: false,
            // to be replaced when global error handler is created
            error: err?.errorEnumMessage.toString() || 'An error occurred',
            message: err?.errorEnumMessage.toString() || 'An error occurred',
            context: err?.additionalContext.toString() || '',
            status: err?.statusCode || 500,
            type: AlaarmErrors[err.errorEnumMessage].toString(),
        };
    } else {
        error = {
            success: false,
            // to be replaced when global error handler is created
            error: 'An error occurred',
            message: 'An error occurred',
            status: 500,
            type: 'INTERNAL_SERVER_ERROR',
        };
    }
    error.stacktrace = err.stack?.split('\n    ');


    res.status(error.status).send(wrapResponse(false, error));
};



