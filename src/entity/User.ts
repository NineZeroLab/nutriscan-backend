import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity("users")
export class User {
    @PrimaryColumn("text")
    uid: string

    @Column("text")
    email: string

    @Column("text")
    password: string

    @Column("timestamp with time zone")
    createdOn: Date

    @Column("timestamp with time zone", { default: null })
    lastLoggedIn: Date
}
