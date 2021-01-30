process.env.NODE_ENV = 'test'

const request = require("supertest");
const expect = require("expect")
const app = require('../src/app')

describe('App Health Check', () => {
    it('contact details of the application owner should be returned', async () => {
        const res = await request(app)
            .get("/")
            .expect(200)
        expect(res.body).toHaveProperty("message")
        expect(res.body).toHaveProperty("status")
        expect(res.body.data).toHaveProperty("name")
        expect(res.body.data).toHaveProperty("github")
        expect(res.body.data).toHaveProperty("email")
        expect(res.body.data).toHaveProperty("mobile")
        expect(res.body.data).toHaveProperty("twitter")
    })
});