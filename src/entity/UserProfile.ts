import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity("user_profile")
export class UserProfile {
    @PrimaryColumn("text")
    uid: string

    @Column("text")
    username: string

    @Column({ name: "is_profile_completed", type: "boolean" })
    isProfileCompleted: boolean

    @Column({ name: "photo_url", type: "text" })
    photoUrl: string

    @Column({ name: "created_at", type: "timestamp with time zone" })
    createdAt: Date

    @Column({
        name: "last_updated_at",
        type: "timestamp with time zone",
        default: () => "CURRENT_TIMESTAMP"
    })
    lastUpdatedAt: Date
}
