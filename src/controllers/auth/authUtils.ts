import db from "../../db";

export const isRegisteredEmail = async (email: string): Promise<Boolean> => {
    const result = await getUserByEmail(email)
    return result.length !== 0
}

export const getUserByEmail = async (email: string): Promise<any[]> => {
    const result = await db.query(
        "SELECT * FROM users WHERE email = $1",
        [email]
    ) ?? []
    console.log(`Rows with given email: ${email}: ${result}`)
    return result
}

export const isValidEmail = (email: string): Boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email)
}

export const isValidPassword = (password: string): Boolean => {
    const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return strongPasswordRegex.test(password)
}
