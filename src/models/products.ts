import Client from '../database'

export type Product = {
    id: number;
    name: string;
    price: number;
}

export class ProductStore {
    async index(): Promise<Product[]> {
        try {
            const conn = await Client.connect();
            const sql = 'SELECT * FROM products';
            const result = await conn.query(sql);
            conn.release()

            return result.rows;
        } catch (err) {
            throw new Error(`Cannot get products: ${err}`)
        }
    }

    async show(id: number): Promise<Product> {
        try {
            const conn = await Client.connect();
            const sql = `SELECT * FROM products WHERE id = ${id}`;
            const result = await conn.query(sql);
            conn.release()

            return result.rows[0];
        } catch (err) {
            throw new Error(`Cannot get product: ${err}`)
        }
    }

    async create(product: Product): Promise<Product> {
        try {
            const conn = await Client.connect();
            const sql = `INSERT INTO products(name, price) VALUES(${product.name}, ${product.price}) RETURNING *`;
            const result = await conn.query(sql);
            conn.release()

            return result.rows[0];
        } catch (err) {
            throw new Error(`Cannot create product: ${err}`)
        }
    }
}