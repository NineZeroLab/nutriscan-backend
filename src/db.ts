import { Pool, QueryResult } from 'pg';
import 'dotenv/config'

const pool = new Pool({
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '5432'),
    password: process.env.DB_PASSWORD
});

const query = async (text: string, params: any[] = []): Promise<QueryResult['rows'] | undefined> => {
    const client = await pool.connect()
    try {
        const response = await client.query(text, params)
        return response.rows
    } catch (e: any) {
        console.error(`Error Occurred!: ${e}`)
    }
}

export default { query }

