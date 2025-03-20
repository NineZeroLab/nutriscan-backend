import db from "../config/db"
import { UserProfile } from "../models/userProfile"
import { Result } from "../utils/result"


export const createUserProfile = async (userProfile: UserProfile): Promise<Result<UserProfile> | undefined> => {
    // verify the a row doesn't already exist with the given username
    const userProfiles = await db.query(
        "SELECT * FROM user_profile WHERE uid = $1",
        [userProfile.uid]
    )
    if (userProfiles?.length !== 0) {
        return {
            success: false,
            message: "userProfile already exists for the given user"
        }
    }


    // create a new row in the user_profile table

    const result = db.query(
        `INSERT INTO user_profile 
       (uid, username, is_profile_completed, photo_url, created_at, last_updated_at) 
       VALUES ($1, $2, $3, $4, $5, $6)
      `,
        [userProfile.uid, userProfile.username, userProfile.isProfileCompleted, userProfile.photoUrl, userProfile.createdAt, userProfile.lastUpdatedAt]
    )


    // return the user profile object
}
