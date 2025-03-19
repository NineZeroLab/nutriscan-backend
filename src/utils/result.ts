export interface Result<T> {
    success: boolean
    data?: T
    message?: string
    error?: string
}

