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
});
