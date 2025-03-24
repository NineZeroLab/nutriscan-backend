import { Response } from "express";
import AppDataSource from "../../config/dataSource";
import { UserProfile } from "../../entity/UserProfile";
import { AuthRequest } from "../../middleware/authMiddleware";


export const getUserProfile = async (req: AuthRequest, res: Response): Promise<any> => {

    const uid = req.params.id
    const userProfileRepo = AppDataSource.getRepository(UserProfile)
    const currentUser = await userProfileRepo.findOneBy({
        uid
    })
    if (currentUser === null) {
        return res.status(404).json({
            message: "user profile not found"
        })
    }

    return res.status(200).json({
        ...currentUser
    })

}
