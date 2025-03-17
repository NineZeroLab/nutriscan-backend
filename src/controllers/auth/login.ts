import { Request, Response } from "express"
import db from "../../db"
import bcrypt from "bcryptjs"
import 'dotenv/config'
import jwt from 'jsonwebtoken'
import { getUserByEmail, isRegisteredEmail } from "./authUtils"

const JWT_SECRET = process.env.JWT_SECRET || "default"

const loginUser = async (req: Request, res: Response): Promise<any> => {
    const { email, password } = req.body
    if (!email || !password) {
        return res.status(400).json({
            error: "Email and password required"
        })
    }
    try {
        const user = await getUserByEmail(email)
        if (user.length == 0) {
            return res.status(400)
                .json({
                    error: "Unable to find a user with given email"
                })
        }

        const passwordMatch = await bcrypt.compare(password, user[0].password)

        if (!passwordMatch) {
            return res.status(400).json({
                error: "Invalid username or password"
            })
        }

        const payload = {
            email: email
        }
        const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" })

        const result = await db.query(
            "UPDATE users SET last_logged_in = NOW() WHERE email = $1",
            [email]
        )

        return res.status(200).json({
            message: "Successfully logged in",
            token: token
        })
    } catch (e: any) {
        console.error("Error occured:", e)
        return res.status(500).json({
            error: "Internal Error Occured"
        })
    }
}

export default loginUser
