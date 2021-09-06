import express, {Request, Response} from "express";
import {Product, ProductStore} from "../models/products";

const store = new ProductStore()

const index = async (_req: Request, res: Response) => {
    const result = await store.index()
    res.json(result)
}

const show = async (req: Request, res: Response) => {
    const result = await store.show(parseInt(req.params.id))
    res.json(result)
}

const create = async (req: Request, res: Response) => {
    try {
        const entity: Product = {
            name: req.body.name,
            price: req.body.price
        }

        const result = await store.create(entity)
        res.json(result)
    } catch (e) {
        res.status(400).json(e)
    }
}

const product_routes = (app: express.Application) => {
    app.get('/products', index)
    app.get('/products/:id', show)
    app.post('/products', create)
}

export default product_routes;