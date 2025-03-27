import AppDataSource from "../config/dataSource"
import db from "../config/db"
import { UserProfile } from "../entity/UserProfile"
import { Result } from "../utils/result"


export const createUserProfile = async (userProfile: UserProfile): Promise<Result<UserProfile> | undefined> => {
    // verify the a row doesn't already exist with the given username
    const userRepo = AppDataSource.getRepository(UserProfile)
    const result = await userRepo.save(userProfile)

    if (!result) {
        console.log("Error occurred while trying to create userProfile", userProfile)
        return {
            success: false,
            message: "Unknow error occurred while trying to create profile"
        }
    }
    return {
        success: true,
        message: "User Profile created Successfully",
        data: result
    }
}
