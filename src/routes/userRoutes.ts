import express from 'express'
import { verifyToken, handleUnauthorizedAccess } from '../middleware/authMiddleware'
import { createUserProfile } from '../controllers/userProfile/createUserProfile'
import { getUserProfile } from '../controllers/userProfile/getUserProfile'
import { updateUserProfile } from '../controllers/userProfile/updateUserProfile'
import { deleteUserProfile } from '../controllers/userProfile/deleteUserProfile'

const router = express.Router()

router.post("/:id",
    verifyToken,
    handleUnauthorizedAccess,
    createUserProfile)

router.get("/:id",
    verifyToken,
    handleUnauthorizedAccess,
    getUserProfile)

router.put("/:id",
    verifyToken,
    handleUnauthorizedAccess,
    updateUserProfile)

router.delete("/:id",
    verifyToken,
    handleUnauthorizedAccess,
    deleteUserProfile)


export default router
