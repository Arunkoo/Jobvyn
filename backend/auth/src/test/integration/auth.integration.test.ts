jest.mock("../../utils/db.js", () => ({ sql: jest.fn() }));
jest.mock("../../producer.js", () => ({
  connectKafka: jest.fn(),
  publishToTopic: jest.fn(),
  disconnectKafka: jest.fn(),
}));
jest.mock("../../index.js", () => ({
  redisClient: { get: jest.fn(), set: jest.fn(), del: jest.fn() },
}));
jest.mock("../../utils/buffer.js", () => jest.fn());
jest.mock("axios");

// new imports for integration
import request from "supertest";
import app from "../../app.js";
import { sql } from "../../utils/db.js";
import getBuffer from "../../utils/buffer.js";

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
  it("return 201 if user registered with role === recruiter", async () => {
    (sql as unknown as jest.Mock).mockResolvedValueOnce([]);
    (sql as unknown as jest.Mock).mockResolvedValueOnce([
      {
        user_id: 1,
        name: "Arun",
        email: "someone@example.com",
        phone_number: "9999999999",
        role: "recruiter",
        created_at: new Date(),
      },
    ]);
    const res = await request(app).post("/api/auth/register").send({
      name: "Arun",
      email: "Someone@example.com",
      password: "999499439",
      phoneNumber: "9999999999",
      role: "recruiter",
    });
    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.token).toBeDefined();
  });
  it("return 400 if no file is uploaded for jobseeker", async () => {
    (sql as unknown as jest.Mock).mockResolvedValueOnce([]);
    const res = await request(app).post("/api/auth/register").send({
      name: "Arun",
      email: "Someone@example.com",
      password: "999499439",
      phoneNumber: "9999999999",
      role: "jobseeker",
    });
    expect(res.status).toBe(400);
    expect(res.body.message).toBe(
      "Please upload a valid resume file to authenticate.",
    );
  });
  it("return 500 if no buffer is returned by server", async () => {
    (sql as unknown as jest.Mock).mockResolvedValueOnce([]);
    (getBuffer as unknown as jest.Mock).mockReturnValueOnce(null);

    const res = await request(app)
      .post("/api/auth/register")
      .field("name", "Arun")
      .field("email", "someone@example.com")
      .field("password", "999499439")
      .field("phoneNumber", "9999999999")
      .field("role", "jobseeker")
      .attach("file", Buffer.from("fake"), "resume.pdf");

    expect(res.status).toBe(500);
    expect(res.body.message).toBe("Failed to generate buffer");
  });
});
