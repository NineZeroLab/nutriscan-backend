import { Response } from "express";
import { AuthRequest } from "../../middleware/authMiddleware";
import AppDataSource from "../../config/dataSource";
import { UserProfile } from "../../entity/UserProfile";



export const deleteUserProfile = async (req: AuthRequest, res: Response): Promise<any> => {
    try {
        const uid = req.params.id
        const userProfileRepo = AppDataSource.getRepository(UserProfile)
        const currentUser = await userProfileRepo.findOneBy({
            uid: uid
        })

        if (currentUser === null) {
            return res.status(404).json({
                message: "user profile not found"
            })
        }

        await userProfileRepo.delete({
            uid: currentUser.uid
        })

        return res.status(200).json({
            message: "successfully deleted user",
            data: {
                ...currentUser
            }
        })
    } catch (e) {
        console.log(e)
        return res.status(500).json({
            message: "internal server error"
        })
    }
}
