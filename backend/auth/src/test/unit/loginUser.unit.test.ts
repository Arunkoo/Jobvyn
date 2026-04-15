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

const data = {
  id: 1,
  name: "Arun",
  email: "someone@example.com",
  password: "pass123",
};
//___________________________________________________
//                TESTS
//___________________________________________________

describe("loginUser", () => {
  // test1:
  it("returns 400 if email is missing", async () => {
    const req = mockRequest({ password: data.password });
    const res = mockResponse();

    await loginUser(req as Request, res as Response, mockNext);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: "Please provide all nesscary details.",
    });
  });

  // test2:
  it("returns 400 if password is missing", async () => {
    const req = mockRequest({ email: data.email });
    const res = mockResponse();

    await loginUser(req as Request, res as Response, mockNext);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: "Please provide all nesscary details.",
    });

    expect(sql).not.toHaveBeenCalled();
  });

  // test 3..
  it("returns 400 if user is not found in DB", async () => {
    const req = mockRequest({ email: data.email, password: data.password });
    const res = mockResponse();

    //mock one time db so next time it hit with fresh data..
    //TODO: COULD BE BETTER TYPE..
    (sql as unknown as jest.Mock).mockResolvedValueOnce([]);

    await loginUser(req as Request, res as Response, mockNext);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: "Invalid credentials",
    });
  });

  //test 4..
  it("return 400 if password does not match", async () => {
    const req = mockRequest({ email: data.email, password: "wrongPass" });
    const res = mockResponse();

    // DB returns a user — but their stored password is hashed "correctpass"
    // bcrypt.compare("wrongpass", hash) → false → triggers "Invalid credentials"
    (sql as unknown as jest.Mock).mockResolvedValueOnce([
      {
        user_id: data.id,
        name: data.name,
        email: data.email,
        password: data.password,
        role: "recruiter",
        skills: [],
      },
    ]);

    await loginUser(req as Request, res as Response, mockNext);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: "Invalid credentials",
    });
  });

  //test 5..
  it("return 200 with token on successful login", async () => {
    const hash = await bcrypt.hash(data.password, 10);
    const req = mockRequest({ email: data.email, password: data.password });
    const res = mockResponse();

    (sql as unknown as jest.Mock).mockResolvedValueOnce([
      {
        user_id: data.id,
        name: data.name,
        email: data.email,
        password: hash,
        role: "recruiter",
        skills: null,
      },
    ]);

    await loginUser(req as Request, res as Response, mockNext);

    expect(res.status).toHaveBeenCalledWith(200);
    // mock.calls is an array of every call made to this mock
    // mock.calls[0] = first call, [0] = first argument
    const responseBody = (res.json as jest.Mock).mock.calls[0][0];

    expect(responseBody.success).toBe(true);
    expect(responseBody.token).toBeDefined();
    expect(responseBody.message).toBe("User LoggedIn successfully");
  });
});
