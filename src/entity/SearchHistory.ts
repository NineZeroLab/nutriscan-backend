import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { UserProfile } from "./UserProfile";

@Entity()
export class SearchHistory {
    @PrimaryColumn("text")
    id: string

    @ManyToOne(() => UserProfile, (userProfile) => userProfile.searchHistory)
    userProfile: UserProfile

    @Column("text")
    productId: string

}
