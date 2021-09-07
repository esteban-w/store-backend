import express, {Request, Response} from 'express'
import {Order, OrderStore} from '../models/orders'
import verifyAuthToken from '../middleware/verify_auth_token'
import {OrderProductsStore} from '../models/order_products'

const store = new OrderStore()
const orderProductsStore = new OrderProductsStore()

const create = async (req: Request, res: Response) => {
    try {
        const entity: Order = {
            status: req.body.status,
            user_id: req.body.user_id
        }

        const result = await store.create(entity)
        res
            .append('Access-Control-Allow-Origin','*')
            .json(result)
    } catch (e) {
        res
            .append('Access-Control-Allow-Origin','*')
            .status(400)
            .json(`${e}`)
    }
}

const getCurrentOrder = async (req: Request, res: Response) => {
    const result = await store.getCurrentOrder(parseInt(req.params.id))
    res
        .append('Access-Control-Allow-Origin','*')
        .json(result)
}

const addProduct = async (req: Request, res: Response) => {
    try {
        const addedProduct = await orderProductsStore.addProduct(
            parseInt(req.body.quantity), parseInt(req.params.id), parseInt(req.body.product_id)
        )
        res
            .append('Access-Control-Allow-Origin','*')
            .json(addedProduct)
    } catch (e) {
        res
            .append('Access-Control-Allow-Origin','*')
            .status(400)
            .json(`${e}`)
    }
}

const order_routes = (app: express.Application) => {
    app.get('/users/:id/order', verifyAuthToken, getCurrentOrder)
    app.post('/orders', verifyAuthToken, create)
    app.post('/orders/:id/products', verifyAuthToken, addProduct)
}

export default order_routes