type PreferenceLevel = "low" | "medium" | "high"

type userPreference = {
    userId: string,
    preferenceType: string,
    preferenceLevel: PreferenceLevel
}
