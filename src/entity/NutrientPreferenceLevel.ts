import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm'
import { UserPreference } from './UserPreference'

@Entity()
export class NutrientPreferenceLevel {
    @PrimaryColumn("text")
    uid: string

    @Column("text")
    level: string

    @OneToMany(() => UserPreference, (userPreference) => userPreference.nutrientPreferenceLevel, { cascade: true })
    userPreferences: UserPreference[]
}
