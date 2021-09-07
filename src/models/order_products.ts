import Client from '../database'

import {Order} from './orders'

export class OrderProductsStore {
    async addProduct(quantity: number, orderId: number, productId: number): Promise<Order> {
        try {
            const sql = `INSERT INTO order_products (quantity, order_id, product_id) 
                VALUES (${quantity}, ${orderId}, ${productId}) RETURNING *`
            const conn = await Client.connect()
            const result = await conn.query(sql)
            const order = result.rows[0]
            conn.release()

            return order
        } catch (e) {
            throw new Error(`Could not add product ${productId} to order ${orderId}: ${e}`)
        }
    }
}