import { Column, Entity, PrimaryColumn } from "typeorm";

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

}
