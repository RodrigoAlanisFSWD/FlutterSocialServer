import app from '../src/app';
import request from 'supertest';

describe("GET /", () => {

    test("should respond with a 200 status code", async () => {
        const res = await request(app).get("/")

        expect(res.statusCode).toBe(200)
    })

})