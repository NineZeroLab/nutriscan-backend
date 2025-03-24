import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { NutrientType } from "./NutrientType";
import { NutrientPreferenceLevel } from "./NutrientPreferenceLevel";

@Entity()
export class UserPreference {
   @PrimaryColumn("text")
   uid: string

   @ManyToOne(() => NutrientType, (nutrientType) => nutrientType.userPreferences)
   nutrientType: NutrientType

   @ManyToOne(() => NutrientPreferenceLevel, (nutrientPreferenceLevel) => nutrientPreferenceLevel.userPreferences)
   nutrientPreferenceLevel: NutrientPreferenceLevel

}
