import { NextFunction, Request, Response } from "express"

const notFound = (req: Request, res: Response, next: NextFunction): void => {
    res.status(404).json({
        error: " 404 Not found"
    })
    next()
}

export default notFound
