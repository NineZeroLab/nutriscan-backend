import { Request, NextFunction, Response, response } from "express";
import { AuthRequest } from '../../middleware/authMiddleware'
import { UserProfile } from "../../entity/UserProfile";
import AppDataSource from "../../config/dataSource";
import { Result } from "../../utils/result";


export const createUserProfile = async (req: AuthRequest, res: Response): Promise<any> => {
    const uid = req.params.id
    const userProfile = new UserProfile()
    userProfile.username = req.body.username ?? (req as AuthRequest).user?.email
    userProfile.uid = uid
    userProfile.photoUrl = req.body.photo_url
    userProfile.createdAt = new Date()
    userProfile.isProfileCompleted = userProfile.username != null && userProfile.photoUrl != null
    userProfile.lastUpdatedAt = new Date()
    try {
        const userProfileRepo = AppDataSource.getRepository(UserProfile)
        await userProfileRepo.save(userProfile)
        return res.status(201).json({
            message: "user profile created successfully",
            data: {
                ...userProfile
            }
        })

    } catch (e) {
        console.error(e)
        return res.status(400).json({
            message: "error while creating user profile"
        })
    }

} 
