import express, {Request, Response} from "express";
import {OrderStore} from "../models/orders";
import verifyAuthToken from "../middleware/verify_auth_token";

const store = new OrderStore()

const getCurrentOrder = async (req: Request, res: Response) => {
    const result = await store.getCurrentOrder(parseInt(req.params.id))
    res.json(result)
}

const order_routes = (app: express.Application) => {
    app.get('/users/:id/order', verifyAuthToken, getCurrentOrder)
}

export default order_routes;