jest.mock("../../utils/db.ts", () => ({
  sql: jest.fn(),
}));

jest.mock("../../producer.ts", () => ({
  connectKafka: jest.fn(),
  publishToTopic: jest.fn(),
  disconnectKafka: jest.fn(),
}));

jest.mock("../../index.ts", () => ({
  redisClient: {
    get: jest.fn(),
    set: jest.fn(),
    del: jest.fn(),
  },
}));

jest.mock("../../utils/buffer.js", () => jest.fn());

jest.mock("axios");

// Import....
import { Request, Response, NextFunction } from "express";
import { sql } from "../../utils/db.js";
import bcrypt from "bcrypt";
import axios from "axios";
import { registerUser } from "../../controller/auth.js";
import getBuffer from "../../utils/buffer.js";

import { mockRequest, mockResponse, mockNext } from "../helpers/mockSetup.js";

const data = {
  id: 1,
  name: "Arun",
  email: "someone@example.com",
  password: "pass123",
  phoneNumber: "9999999999",
  recruiterRole: "recruiter",
  jobseekerRole: "jobseeker",
};
// tests//

describe("registerUser", () => {
  it("return 400 if required fields are missing", async () => {
    const req = mockRequest({ name: data.name });
    const res = mockResponse();

    await registerUser(req as Request, res as Response, mockNext);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: "All details are required to register.",
    });
    expect(sql).not.toHaveBeenCalled();
  });
  it("return 409 if user with this email already exists", async () => {
    const req = mockRequest({
      name: data.name,
      email: data.email,
      password: data.password,
      phoneNumber: data.phoneNumber,
      role: data.recruiterRole,
    });
    const res = mockResponse();

    (sql as unknown as jest.Mock).mockResolvedValueOnce([{ user_id: data.id }]);

    await registerUser(req as Request, res as Response, mockNext);

    expect(res.status).toHaveBeenCalledWith(409);
    expect(res.json).toHaveBeenCalledWith({
      message: "User with this email already exits",
    });
  });
  it("return 201 if user registered with role === recruiter", async () => {
    const req = mockRequest({
      name: data.name,
      email: data.email,
      password: data.password,
      phoneNumber: data.phoneNumber,
      role: data.recruiterRole,
    });
    const res = mockResponse();

    (sql as unknown as jest.Mock).mockResolvedValueOnce([]); //no duplicate user retrun empty..
    (sql as unknown as jest.Mock).mockResolvedValueOnce([
      {
        name: data.name,
        email: data.email,
        password: data.password,
        phoneNumber: data.phoneNumber,
        role: data.recruiterRole,
        created_at: new Date(),
      },
    ]);

    await registerUser(req as Request, res as Response, mockNext);

    expect(res.status).toHaveBeenCalledWith(201);

    const body = (res.json as jest.Mock).mock.calls[0][0];
    expect(body.success).toBe(true);
    expect(body.token).toBeDefined();
  });

  it("returns 400 if no file is uploaded for jobseeker", async () => {
    // Arrange
    const req = mockRequest(
      {
        name: data.name,
        email: data.email,
        password: data.password,
        phoneNumber: data.phoneNumber,
        role: data.jobseekerRole,
      },
      {},
      undefined, // no file
    );
    const res = mockResponse();

    (sql as unknown as jest.Mock).mockResolvedValueOnce([]); // no duplicate

    await registerUser(req as Request, res as Response, mockNext);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: "Please upload a valid resume file to authenticate.",
    });
  });

  it("return 500 if no buffer is returned by server", async () => {
    const fakeFile = {
      originalname: "resume.pdf",
      buffer: Buffer.from("fake"),
      mimetype: "application/pdf",
    };
    const req = mockRequest(
      {
        name: data.name,
        email: data.email,
        password: data.password,
        phoneNumber: data.phoneNumber,
        role: data.jobseekerRole,
      },
      {},
      fakeFile,
    );

    const res = mockResponse();
    (sql as unknown as jest.Mock).mockResolvedValueOnce([]);
    (getBuffer as unknown as jest.Mock).mockReturnValueOnce(null);

    await registerUser(req as Request, res as Response, mockNext);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      message: "Failed to generate buffer",
    });
  });

  it("return 201 if jobseeker registered successfully", async () => {
    const fakeFile = {
      originalname: "resume.pdf",
      buffer: Buffer.from("fake"),
      mimetype: "application/pdf",
    };
    const req = mockRequest(
      {
        name: data.name,
        email: data.email,
        password: data.password,
        phoneNumber: data.phoneNumber,
        role: data.jobseekerRole,
      },
      {},
      fakeFile,
    );

    const res = mockResponse();

    (sql as unknown as jest.Mock).mockResolvedValueOnce([]);
    (getBuffer as unknown as jest.Mock).mockReturnValueOnce({
      content: "data:application/pdf;base64,ZmFrZQ==",
    });
    (axios.post as unknown as jest.Mock).mockResolvedValueOnce({
      data: { url: "https://cdn.example.com/resume.pdf", public_id: "abc123" },
    });
    (sql as unknown as jest.Mock).mockResolvedValueOnce([
      {
        user_id: data.id,
        name: data.name,
        email: data.email,
        phone_number: data.phoneNumber,
        role: data.jobseekerRole,
        resume: "https://cdn.example.com/resume.pdf",
        created_at: new Date(),
      },
    ]);

    await registerUser(req as Request, res as Response, mockNext);

    expect(res.status).toHaveBeenCalledWith(201);
    const body = (res.json as jest.Mock).mock.calls[0][0];
    expect(body.success).toBe(true);
    expect(body.token).toBeDefined();
  });
});
