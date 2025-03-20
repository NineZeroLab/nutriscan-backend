import { Request, Response } from "express"
import db from "../../config/db"
import bcrypt from "bcryptjs"
import 'dotenv/config'
import jwt from 'jsonwebtoken'
import { loginUserWithEmailAndPassword } from "../../repository/authRepository"

const JWT_SECRET = process.env.JWT_SECRET || "default"

const loginUser = async (req: Request, res: Response): Promise<any> => {
    const { email, password } = req.body
    if (!email || !password) {
        return res.status(400).json({
            error: "Email and password required"
        })
    }
    try {
        const result = await loginUserWithEmailAndPassword(email, password)
        if (!result?.success) {
            return res.status(400).json({
                error: result?.error?.toString()
            })
        }
        return res.status(200).json({
            message: "Successfully logged in",
            token: result.data?.toString()
        })
    } catch (e: any) {
        console.error("Error occured:", e)
        return res.status(500).json({
            error: "Internal Error Occured"
        })
    }
}

export default loginUser
