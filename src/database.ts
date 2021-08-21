import dotenv from 'dotenv'
import { Pool } from 'pg'

dotenv.config()

const {
    POSTGRES_HOST,
    POSTGRES_DB,
    POSTGRES_USER,
    POSTGRES_PASSWORD,
} = process.env

const client = new Pool({
    host: POSTGRES_HOST,
    database: POSTGRES_HOST,
    user: POSTGRES_HOST,
    password: POSTGRES_HOST,
})

export default client