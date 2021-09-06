import express, {Request, Response} from "express";
import {User, UserStore} from "../models/users";

const store = new UserStore()

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
        const entity: User = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password
        }

        const result = await store.create(entity)
        res.json(result)
    } catch (e) {
        res.status(400).json(e)
    }
}

const user_routes = (app: express.Application) => {
    app.get('/users', index)
    app.get('/users/:id', show)
    app.post('/users', create)
}

export default user_routes;