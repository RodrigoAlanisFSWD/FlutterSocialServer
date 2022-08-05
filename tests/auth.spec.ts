import app from '../src/app'
import request from 'supertest';
import prisma from '../src/prisma';

describe('Test Auth Endpoints', () => {

    afterAll(async () => {
        await prisma.user.delete({
            where: {
                username: "Arkpex00"
            }
        })
    })

    const user = {
        username: "Arkpex00",
        email: "rodrigoalanisfswd@gmail.com",
        password: "123123"
    }

    describe('POST /api/auth/sign-up', () => {
        const url = "/api/auth/sign-up";

        test('should respond with a 200 status code', async () => {
            const res = await request(app).post(url).send(user);

            expect(res.statusCode).toBe(200)
        })

        test('should respond with a 409 status code', async () => {
            const res = await request(app).post(url).send(user);

            expect(res.statusCode).toBe(409)
        })

    })

    describe('POST /api/auth/sign-in', () => {
        const url = '/api/auth/sign-in'

        test('should respond with a 200 status code', async () => {
            const res = await request(app).post(url).send(user);

            expect(res.statusCode).toBe(200)
        })

        test('should respond with a 404 status code', async () => {
            const res = await request(app).post(url).send({
                ...user,
                email: "email@gmail.com"
            });

            expect(res.statusCode).toBe(404)
        })

        test('should respond with a 401 status code', async () => {
            const res = await request(app).post(url).send({
                ...user,
                password: "not_password"
            });

            expect(res.statusCode).toBe(401)
        })
    })

})