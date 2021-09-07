import express, {Request, Response} from 'express'
import {Order, OrderStore} from '../models/orders'
import verifyAuthToken from '../middleware/verify_auth_token'

const store = new OrderStore()

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

const order_routes = (app: express.Application) => {
    app.get('/users/:id/order', verifyAuthToken, getCurrentOrder)
    app.post('/orders', verifyAuthToken, create)
}

export default order_routes