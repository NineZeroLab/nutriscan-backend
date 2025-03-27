import { Column, Entity, OneToMany, OneToOne, PrimaryColumn } from "typeorm";
import { UserDietaryRestriction } from "./UserDietaryRestrictions";
import { SearchHistory } from "./SearchHistory";

@Entity()
export class UserProfile {
    @PrimaryColumn("text")
    uid: string

    @Column("text")
    username: string

    @Column("boolean")
    isProfileCompleted: boolean

    @Column("text", { default: null })
    photoUrl: string

    @Column("timestamp with time zone")
    createdAt: Date

    @Column({
        type: "timestamp with time zone",
        default: () => "CURRENT_TIMESTAMP"
    })
    lastUpdatedAt: Date

    @OneToOne(() => UserDietaryRestriction, (userDietaryRestriction) => userDietaryRestriction.userProfile)
    userDietaryRestriction: UserDietaryRestriction

    @OneToMany(() => SearchHistory, (searchHistory) => searchHistory.userProfile)
    searchHistory: SearchHistory[]
}
