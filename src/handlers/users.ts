import express, {Request, Response} from "express";
import {User, UserStore} from "../models/users";
import jwt from "jsonwebtoken"

const store = new UserStore()
const { TOKEN_SECRET = '' } = process.env

const index = async (_req: Request, res: Response) => {
    const result = await store.index()
    res.json(result)
}

const show = async (req: Request, res: Response) => {
    const result = await store.show(parseInt(req.params.id))
    res.json(result)
}

const create = async (req: Request, res: Response) => {
    const entity: User = {
        firstName: req.body.firstName || '',
        lastName: req.body.lastName || '',
        email: req.body.email,
        password: req.body.password
    }

    try {
        const result = await store.create(entity)
        const token = jwt.sign({ user: entity }, TOKEN_SECRET)
        res.json(token)
    } catch (e) {
        res.status(400).json(`${e}${entity}`)
    }
}

const authenticate = async (req: Request, res: Response) => {
    try {
        const result = await store.authenticate(req.body.username, req.body.password)
        const token = jwt.sign({user: result}, TOKEN_SECRET)
        res.json(token)
    } catch (e) {
        res.status(400).json(e)
    }
}

const user_routes = (app: express.Application) => {
    app.get('/users', index)
    app.get('/users/:id', show)
    app.post('/users', create)
    app.post('/users/authenticate', authenticate)
}

export default user_routes;