import { Column, Entity, PrimaryColumn } from "typeorm";


@Entity()
export class DietaryRestriction {
    @PrimaryColumn("text")
    uid: string

    @Column("text")
    restriction: string

}
