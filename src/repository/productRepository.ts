import { randomUUID } from "crypto"
import AppDataSource from "../config/dataSource"
import { SearchHistory } from "../entity/SearchHistory"
import { UserProfile } from "../entity/UserProfile"
import { Result } from "../utils/result"

export const addToSearchHistory = async (userId: string, productId: string): Promise<Result<SearchHistory>> => {
    const userProfileRepo = AppDataSource.getRepository(UserProfile)
    const userProfile = await userProfileRepo.findOneBy({ uid: userId })
    if (userProfile === null) {
        return {
            success: false,
            message: "Unable to find user with given ID"
        }
    }

    const searchHistoryRepo = AppDataSource.getRepository(SearchHistory)
    const result = await searchHistoryRepo.find({
        where: {
            productId: productId,
            userProfile: {
                uid: userId
            }
        },
        relations: ["userProfile"]
    })

    if (result.length !== 0) {
        return {
            success: false,
            message: "product already in the search history"
        }
    }

    const searchHistoryItem = new SearchHistory()
    searchHistoryItem.id = randomUUID()
    searchHistoryItem.userProfile = userProfile
    searchHistoryItem.productId = productId
    const searchHistoryResult = await searchHistoryRepo.save(searchHistoryItem)

    return {
        success: true,
        data: searchHistoryResult
    }
}
