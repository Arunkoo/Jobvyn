jest.mock("../../utils/db.js", () => ({ sql: jest.fn() }));
jest.mock("../../producer.js", () => ({
  connectKafka: jest.fn(),
  publishToTopic: jest.fn(),
  disconnectKafka: jest.fn(),
}));
jest.mock("../../index.js", () => ({
  redisClient: { get: jest.fn(), set: jest.fn(), del: jest.fn() },
}));
jest.mock("axios");

// new imports for integration
import request from "supertest";
import app from "../../app.js";
import { sql } from "../../utils/db.js";

describe("POST /api/auth/register", () => {
  it("returns 400 if required fields are missing", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send({ name: "Arun" });

    expect(res.status).toBe(400);
    expect(res.body.message).toBe("All details are required to register.");
  });
  it("returns 409 if user with this email already exists", async () => {
    (sql as unknown as jest.Mock).mockResolvedValueOnce([{ user_id: 1 }]);
    const res = await request(app).post("/api/auth/register").send({
      name: "Arun",
      email: "someone@example.com",
      password: "pass123",
      phoneNumber: "9999999999",
      role: "recruiter",
    });
    expect(res.status).toBe(409);
    expect(res.body.message).toBe("User with this email already exits");
  });
});
