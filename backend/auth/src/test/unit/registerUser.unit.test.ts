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

jest.mock("axios");

// Import....
import { Request, Response, NextFunction } from "express";
import { sql } from "../../utils/db.js";
import bcrypt from "bcrypt";
import axios from "axios";
import { registerUser } from "../../controller/auth.js";

import { mockRequest, mockResponse, mockNext } from "../helpers/mockSetup.js";

const data = {
  id: 1,
  name: "Arun",
  email: "someone@example.com",
  password: "pass123",
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
});
