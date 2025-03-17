import { NextFunction, Request, Response } from "express";

const serverError = (err: Error, req: Request, res: Response, next: NextFunction): void => {
    res.status(500).json({
        error: "Internal Server Error"
    })
    next();
}

export default serverError
