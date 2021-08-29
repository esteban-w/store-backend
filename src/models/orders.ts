import Client from '../database'

export type Order = {
    id: number;
    status: string;
    user_id: number;
}

export class OrderStore {
    async getCurrentOrder(userId: number): Promise<Order | null> {
        try {
            const conn = await Client.connect();
            const sql = `SELECT * FROM orders WHERE user_id=${userId} AND status='active' LIMIT 1`;
            const result = await conn.query(sql);
            conn.release()

            return result.rows[0];
        } catch (err) {
            throw new Error(`Cannot get current order: ${err}`)
        }
    }
}