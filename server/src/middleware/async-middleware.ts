import { Request, Response, NextFunction } from "express";

/**
 * Wrapper for middlewares that need to perform async actions, e.g. db lookup.
 * @param fn 
 * @returns 
 */
const asyncMiddleware = (fn: (req: Request, res: Response, next: NextFunction) => void) => (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

export default asyncMiddleware;
