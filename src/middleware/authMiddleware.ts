import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import 'dotenv/config'
import { decode } from "punycode";
import { type } from "os";

const JWT_SECRET = process.env.JWT_SECRET

export interface AuthRequest extends Request {
    user?: {
        email: string,
        uid: string
    }
}

export const verifyToken = (req: AuthRequest, res: Response, next: NextFunction): void => {
    const authHeader = req.header("Authorization")

    if (!authHeader || !authHeader.startsWith("Bearer ") || authHeader.split(" ").length !== 2) {
        res.status(401).json({
            error: "Invalid auth token"
        })
        return
    }
    const token = authHeader.split(" ")[1]
    try {
        const decoded = jwt.verify(token, JWT_SECRET as string)
        if (!(typeof decoded === "object" && "email" in decoded && "uid" in decoded)) {
            console.error("token should contain email and uid as payload")
            throw Error("Invalid auth token")
        }
        req.user = {
            email: decoded.email as string,
            uid: decoded.uid as string
        }
        console.log("user token verified")
        next()
    } catch (e) {
        res.status(401).json({
            error: "Invalid auth token"
        })
        return
    }
}

export const handleUnauthorizedAccess = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {

    if (!req.user || req.params.id !== req.user.uid) {
        res.status(403).json({
            error: "Unauthorized request"
        })
        return
    }
    next()
}

