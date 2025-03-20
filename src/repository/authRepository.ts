import jwt from "jsonwebtoken"
import { UserCredential, UserProfile } from "../models/userProfile"
import db from "../config/db"
import bcrypt from 'bcryptjs'
import { isValidEmail, isValidPassword } from "../controllers/auth/authUtils"
import { Result } from "../utils/result"
import { randomUUID } from "crypto"
import 'dotenv/config'
import AppDataSource from "../config/dataSource"
import { User } from "../entity/User"

const JWT_SECRET = process.env.JWT_SECRET || "default"

export const registerUserWithEmailAndPassword = async (email: string, password: string): Promise<Result<User> | undefined> => {
    if (!isValidEmail(email) || !isValidPassword(password)) {
        return {
            success: false,
            error: "invalid username or password"
        }
    }

    const userRepo = AppDataSource.getRepository(User)

    const existingEmail = await userRepo.findOneBy({
        email: email
    })

    if (existingEmail !== null) {
        return {
            success: false,
            error: "email already used"

        }
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const uid = randomUUID()

    const newUser = new User()
    newUser.uid = uid
    newUser.email = email
    newUser.password = hashedPassword
    newUser.createdOn = new Date()

    const result = await userRepo.insert(newUser)

    return {
        success: true,
        data: newUser,
        message: "user registered successfully"
    }
}

export const loginUserWithEmailAndPassword = async (email: string, password: string): Promise<Result<string> | undefined> => {
    if (!isValidEmail(email) || !isValidPassword(password)) {
        return {
            success: false,
            error: "invalid username or password"
        }
    }

    const userRepo = AppDataSource.getRepository(User)
    const currentUser = await userRepo.findOneBy({
        email: email
    })
    if (currentUser === null) {
        return {
            success: false,
            error: "No user registered for the given email"
        }
    }
    const isCorrectPassword = await bcrypt.compare(password, currentUser.password)
    if (!isCorrectPassword) {
        return {
            success: false,
            error: "Invalid credentials"
        }
    }
    const payload = {
        email: email,
        uid: currentUser.uid
    }

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" })

    currentUser.lastLoggedIn = new Date()
    await userRepo.save(currentUser)

    return {
        success: true,
        data: token
    }

}
