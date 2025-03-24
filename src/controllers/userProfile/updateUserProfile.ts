import { Response } from "express";
import { AuthRequest } from "../../middleware/authMiddleware";
import AppDataSource from "../../config/dataSource";
import { UserProfile } from "../../entity/UserProfile";



export const updateUserProfile = async (req: AuthRequest, res: Response): Promise<any> => {

    const uid = req.params.id
    try {
        const userProfileRepo = AppDataSource.getRepository(UserProfile)
        const currentUser = await userProfileRepo.findOneBy({
            uid: uid
        })

        if (currentUser === null) {
            return res.status(404).json({
                message: "no user profile found"
            })
        }

        currentUser.photoUrl = req.body.photoUrl ?? currentUser.photoUrl
        currentUser.username = req.body.username ?? currentUser.username
        currentUser.lastUpdatedAt = new Date()
        currentUser.isProfileCompleted = currentUser.photoUrl != null && currentUser.username != null

        await userProfileRepo.save(currentUser)
        return res.status(201).json({
            ...currentUser
        })

    } catch (e) {
        console.error(e)

        return res.status(500).json({
            message: "internal Error Occured"
        })
    }


}
