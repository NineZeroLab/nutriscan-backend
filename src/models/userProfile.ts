export type UserProfile = {
    uid: string,
    username: string,
    isProfileCompleted: boolean,
    photoUrl: string,
    createdAt: Date,
    lastUpdatedAt: Date
}

export type UserCredential = {
    uid: string,
    email: string,
    password: string
}


