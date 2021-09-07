import supertest from "supertest"
import app from "../server"

const request = supertest(app)

describe('Test endpoint responses', () => {
    let userToken: string

    beforeAll(async () => {
        const response = await request.post('/users')
            .set('Content-Type', 'application/json')
            .send({"email": "user@email.com", "password": "pass123"})
        userToken = response.body
        console.log('beforeAll POST /users')
        console.log(response.body)
    })

    it('should create a user /users endpoint', async () => {
        const response = await request.post('/users')
            .set('Content-Type', 'application/json')
            .send({"email": "test@email.com", "password": "pass123"})
        console.log('POST /users')
        console.log(response.body)

        expect(response.status).toBe(200)
    })

    it('should return users from /users endpoint', async () => {
        const response = await request.get('/users')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${userToken}`)
        console.log('GET /users')
        console.log(response.body)

        expect(Array.isArray(response.body)).toBeTrue()
    })

    it('should return user from /users/:id endpoint', async () => {
        const response = await request.get('/users/1')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${userToken}`)
        console.log('GET /users/1')
        console.log(response.body)

        expect(response.status).toBe(200)
    })

    it('should create product /products endpoint', async () => {
        const response = await request.post('/products')
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${userToken}`)
            .send({
                "name": "Product Test Name",
                "price": 333
            })
        console.log('POST /products')
        console.log(response.body)

        expect(response.status).toBe(200)
    })

    it('should return products from /products endpoint', async () => {
        const response = await request.get('/products')
            .set('Accept', 'application/json')
        console.log('GET /products')
        console.log(response.body)

        expect(Array.isArray(response.body)).toBeTrue()
    })

    it('should return product by id from /products/:id endpoint', async () => {
        const response = await request.get('/products/1')
            .set('Accept', 'application/json')
        console.log('GET /products/1')
        console.log(response.body)

        expect(response.status).toBe(200)
    })

    it('should create order /orders endpoint', async () => {
        const response = await request.post('/orders')
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${userToken}`)
            .send({
                "status": "active",
                "user_id": 1
            })
        console.log('POST /orders')
        console.log(response.body)

        expect(response.status).toBe(200)
    })

    it('should return order by user id from /users/:id/order endpoint', async () => {
        const response = await request.get('/users/1/order')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${userToken}`)
        console.log('GET /users/1/order')
        console.log(response.body)

        expect(response.status).toBe(200)
    })
})