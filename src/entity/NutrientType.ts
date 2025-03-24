import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { UserPreference } from "./UserPreference";

@Entity()
export class NutrientType {
    @PrimaryColumn("text")
    uid: string

    @Column("text")
    name: string

    @OneToMany(() => UserPreference, (userPreference) => userPreference.nutrientType)
    userPreferences: UserPreference[]
}

