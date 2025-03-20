import express from 'express'
import { verifyToken, handleUnauthorizedAccess } from '../middleware/authMiddleware'

const router = express.Router()

router.get("/users/:id", verifyToken, handleUnauthorizedAccess, getUserProfile)
router.post("/users/:id", verifyToken, handleUnauthorizedAccess, createUserProfile)
router.put("/users/:id", verifyToken, handleUnauthorizedAccess, updateUserProfile)
router.delete("/users/:id", verifyToken, handleUnauthorizedAccess, deleteUserProfile)
