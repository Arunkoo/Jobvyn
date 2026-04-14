// mock up everythings touched by login...
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

//Import--after mock...
import { Request, Response, NextFunction } from "express";
import { sql } from "../../utils/db.js";
import { loginUser } from "../../controller/auth.js";
import axios from "axios";
import bcrypt from "bcrypt";

const mockRequest = (body = {}): Partial<Request> => ({ body });

const mockResponse = () => {
  const res: Partial<Response> = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

const mockNext: NextFunction = jest.fn();

//___________________________________________________
//                TESTS
//___________________________________________________

describe("loginUser", () => {
  // test1:
  it("returns 400 if email is missing", async () => {
    const req = mockRequest({ password: "pass123" });
    const res = mockResponse();

    await loginUser(req as Request, res as Response, mockNext);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: "Please provide all nesscary details.",
    });
  });

  // test2:
  it("returns 400 if password is missing", async () => {
    const req = mockRequest({ email: "someone@example.com" });
    const res = mockResponse();

    await loginUser(req as Request, res as Response, mockNext);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: "Please provide all nesscary details.",
    });

    expect(sql).not.toHaveBeenCalled();
  });
});
