import Client from '../database'
import bcrypt from 'bcrypt'

const {
    BCRYPT_PASSWORD,
    SALT_ROUNDS = '10',
} = process.env

export type User = {
    id?: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export class UserStore {
    async index(): Promise<User[]> {
        try {
            const conn = await Client.connect();
            const sql = 'SELECT * FROM users';
            const result = await conn.query(sql);
            conn.release()

            return result.rows;
        } catch (err) {
            throw new Error(`Cannot get users: ${err}`)
        }
    }

    async show(id: number): Promise<User> {
        try {
            const conn = await Client.connect();
            const sql = `SELECT * FROM users WHERE id = ${id}`;
            const result = await conn.query(sql);
            conn.release()

            return result.rows[0];
        } catch (err) {
            throw new Error(`Cannot get user: ${err}`)
        }
    }

    async create(user: User): Promise<User> {
        if (!user.email || !user.password) {
            throw new Error('email and password are required values')
        }

        try {
            const conn = await Client.connect();
            const hash = bcrypt.hashSync(
                user.password + BCRYPT_PASSWORD,
                parseInt(SALT_ROUNDS)
            );
            const sql = `INSERT INTO users(firstName, lastName, email, password) 
                VALUES('${user.firstName}', '${user.lastName}', '${user.email}', '${hash}') RETURNING *`;
            const result = await conn.query(sql);
            conn.release()

            return result.rows[0];
        } catch (err) {
            throw new Error(`Cannot create user: ${err}`)
        }
    }

    async authenticate(email: string, password: string): Promise<User | null> {
        if (!email || !password) {
            throw new Error('email and password are required values')
        }

        const conn = await Client.connect()
        const sql = `SELECT * FROM users WHERE email = '${email}'`
        const result = await conn.query(sql)

        if (result.rows.length) {
            const user = result.rows[0]

            if (bcrypt.compareSync(`${password}${BCRYPT_PASSWORD}`, user.password)) {
                return user
            }
        }

        return null
    }
}