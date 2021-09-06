import Client from '../database'
import bcrypt from 'bcrypt'

const {
    BCRYPT_PASSWORD,
    SALT_ROUNDS = 10,
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
        try {
            const conn = await Client.connect();
            const hash = bcrypt.hashSync(
                user.password + BCRYPT_PASSWORD,
                SALT_ROUNDS
            );
            const sql = `INSERT INTO users(firstName, lastName, email, password) 
                VALUES(${user.firstName}, ${user.lastName}, ${user.email}, ${hash}) RETURNING *`;
            const result = await conn.query(sql);
            conn.release()

            return result.rows[0];
        } catch (err) {
            throw new Error(`Cannot create user: ${err}`)
        }
    }

    async authenticate(username: string, password: string): Promise<User | null> {
        const conn = await Client.connect()
        const sql = `SELECT password FROM users WHERE username = ${username}`
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