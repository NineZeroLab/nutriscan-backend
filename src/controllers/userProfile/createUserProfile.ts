import { Request, NextFunction, Response } from "express";
import { AuthRequest } from '../../middleware/authMiddleware'



export const createUserProfile = async (req: AuthRequest, res: Response) => {



}




export const constHandleUnauthorizedAccess = async (req: AuthRequest, res: Response, next: NextFunction) => {
    if (req.params.id !== req.user.id) {
        res.status(400).json({
            error: "Unauthorized request"
        })
    }
    next()
}
