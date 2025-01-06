const request = require("supertest");
const { createApp } = require("../createApp");
const { MongoMemoryServer } = require("mongodb-memory-server");
const mongoose = require("mongoose");
const { createUser } = require("../service/user.service");
const jwtService = require("../utils/jwt");

jest.mock("../utils/jwt", () => ({
  ...jest.requireActual("../utils/jwt"),
  verifyJwt: jest.fn(),
}));

describe("Endpoints Test Server", () => {
  let app;

  beforeAll(async () => {
    app = createApp();
    const mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri());
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoose.connection.close();
  });

  beforeEach(async () => {
    const collections = mongoose.connection.collections;
    for (const key in collections) {
      await collections[key].deleteMany({});
    }
  });

  test("test GetUsers Route API should return All Users", async () => {
    const newUser = {
      user_name: "bob",
      user_email: "bobi@gmail.com",
      user_password: "12345678",
    };

    // create Fake User
    const user = await createUser(newUser);

    // Send HTTP request to Server
    const { body, statusCode } = await request(app).get("/api/users");

    expect(statusCode).toBe(200);
    expect(body[0].user_name).toBe(user.user_name);
  });

  test("test Register Route API should add New User", async () => {
    const newUser = {
      user_name: "bob",
      user_email: "bobi@gmail.com",
      user_password: "12345678",
    };

    // Send HTTP request to Server
    const { body, statusCode } = await request(app)
      .post("/api/users/register")
      .send({ ...newUser });

    expect(statusCode).toBe(201);
  });

  test("test Login Route API should return token into Http Request", async () => {
    const user = {
      user_email: "bobi@gmail.com",
      user_password: "12345678",
    };

    // Create New User on fake Db
    await createUser({ ...user, user_name: "eyal" });

    // Send HTTP request to Login Route Api
    const { statusCode, body, headers } = await request(app)
      .post("/api/users/login")
      .send({ ...user });

    const cookie = headers["set-cookie"];

    expect(cookie).toBeDefined();
    expect(statusCode).toBe(200);
    expect(cookie[0]).toContain("HttpOnly");
  });

  test("test Auth Route API should return user Info in Response", async () => {
    const user = {
      user_email: "bobi@gmail.com",
      user_password: "12345678",
    };

    // Create New User on fake Db
    await createUser({ ...user, user_name: "eyal" });

    // Send HTTP request to Login Route Api
    const { headers } = await request(app)
      .post("/api/users/login")
      .send({ ...user });

    const cookie = headers["set-cookie"];

    // Send HTTP request to Login Route Api
    const { statusCode, body } = await request(app)
      .get("/api/users/auth")
      .set("Cookie", cookie);

    expect(statusCode).toBe(200);
    expect(body).toEqual({ success: true, user: expect.anything() });
  });
  
  test("test Auth Route API should return user Info in Response Mock JWT", async () => {
    jwtService.verifyJwt.mockResolvedValue({ user: { user_name: "bob" } });

    // Send HTTP request to Login Route Api
    const { statusCode, body } = await request(app)
      .get("/api/users/auth")
      .set("Cookie", ["token=sdjcokisdjdkjsckolds"]);

    expect(statusCode).toBe(200);
    expect(body).toEqual({ success: true, user: expect.anything() });
  });
});
