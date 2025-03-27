import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm'
import { UserNutrientPreference } from './UserPreference'

@Entity()
export class NutrientPreferenceLevel {
    @PrimaryColumn("text")
    uid: string

    @Column("text")
    level: string

    @OneToMany(() => UserNutrientPreference, (userPreference) => userPreference.nutrientPreferenceLevel, { cascade: true })
    userNutrientPreference: UserNutrientPreference[]
}
