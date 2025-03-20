import { Column, Entity, PrimaryColumn } from "typeorm";


@Entity('users')
export class User {
    @PrimaryColumn("text")
    uid: string

    @Column("text")
    email: string

    @Column("text")
    password: string

    @Column("timestamp with time zone", { name: "created_on" })
    createdOn: Date

    @Column("timestamp with time zone", { name: "last_logged_in" })
    lastLoggedIn: Date
}
