import express, {Request, Response} from "express";
import {OrderStore} from "../models/orders";

const store = new OrderStore()

const getCurrentOrder = async (req: Request, res: Response) => {
    const result = await store.getCurrentOrder(parseInt(req.params.id))
    res.json(result)
}

const order_routes = (app: express.Application) => {
    app.get('/users/:id/order', getCurrentOrder)
}

export default order_routes;