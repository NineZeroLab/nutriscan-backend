import { Request, Response } from "express"
import db from "../../config/db"
import bcrypt from 'bcryptjs'
import { isValidEmail, isValidPassword } from "./authUtils"
import { isGeneratorObject } from "util/types"
import { randomUUID } from "crypto"
import { registerUserWithEmailAndPassword } from "../../repository/authRepository"

const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")

const JWT_SECRET = process.env.JWT_SECRET

const registerUser = async (req: Request, res: Response): Promise<any> => {
    const { email, password } = req.body

    const result = await registerUserWithEmailAndPassword(email, password)

    if (!result) {
        return res.status(500).json({
            error: "unknown error occurred"
        })
    }

    if (!result.success) {
        return res.status(401).json({
            error: result.error?.toString()
        })
    }
    return res.status(201).json({
        message: result.message?.toString()
    })
}

export default registerUser
