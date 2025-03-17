import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import 'dotenv/config'
import { decode } from "punycode";

const JWT_SECRET = process.env.JWT_SECRET

interface AuthRequest extends Request {
    user?: any
}

const verifyToken = (req: AuthRequest, res: Response, next: NextFunction): void => {
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
        req.user = decoded
        console.log("user token verified")
        next()
    } catch (e) {
        res.status(401).json({
            error: "Invalid auth token"
        })
        return
    }
}

export default verifyToken
