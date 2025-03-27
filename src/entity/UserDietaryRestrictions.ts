import { Entity, PrimaryColumn, Column, OneToOne, JoinColumn } from "typeorm"
import { UserProfile } from "./UserProfile"


@Entity()
export class UserDietaryRestriction {
    @PrimaryColumn("text")
    uid: string

    @OneToOne(() => UserProfile, (userProfile) => userProfile.userDietaryRestriction)
    @JoinColumn()
    userProfile: UserProfile

    @Column("text", { array: true })
    restrictions: string[]
}
