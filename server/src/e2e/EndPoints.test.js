const request = require("supertest");
const { createApp, createAppE2E } = require("../createApp");

describe("Endpoints Test Server",() => {

    let app;

    beforeAll(() => {
       app = createAppE2E();
    })

    test("test GetUsers Route API should return All Users",async () => {
        // Send HTTP request to Server
       const { body , statusCode } = await request(app).get("/api/users");

       expect(statusCode).toBe(200)
       expect(body[0].user_name).toBe("bob")
    })


})