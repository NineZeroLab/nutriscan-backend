import { Request, Response } from "express"
import db from "../../db"
import bcrypt from 'bcryptjs'
import { isRegisteredEmail, isValidEmail, isValidPassword } from "./authUtils"
import { isGeneratorObject } from "util/types"
import { randomUUID } from "crypto"

const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")

const JWT_SECRET = process.env.JWT_SECRET

const registerUser = async (req: Request, res: Response): Promise<any> => {
    const { email, password } = req.body
    if (!email || !password) {
        return res.status(400).json({
            error: "Email and password is required"
        })
    }
    if (!isValidEmail(email) || !isValidPassword(password)) {
        return res.status(400).json({
            error: "Email and Password doesn't meet requirements'"
        })
    } try {
        const hashedPassword = await bcrypt.hash(password, 10)
        const uid = randomUUID()

        if (await isRegisteredEmail(email)) {
            return res.status(400)
                .json({
                    error: "User already exists with the given email"
                })
        }
        const result = await db.query(
            "INSERT INTO users (uid, email, password, created_on) values($1, $2, $3, NOW())",
            [uid, email, hashedPassword]
        );
        return res.status(200).json({
            message: "User created successfully"
        })
    } catch (e) {
        return res.status(500).json({
            error: "Internal Error Occured"
        })
    }
}

export default registerUser
