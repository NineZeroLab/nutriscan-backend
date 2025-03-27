import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { UserNutrientPreference } from "./UserPreference";

@Entity()
export class NutrientType {
    @PrimaryColumn("text")
    uid: string

    @Column("text")
    name: string

    @OneToMany(() => UserNutrientPreference, (userPreference) => userPreference.nutrientType)
    userPreferences: UserNutrientPreference[]
}

