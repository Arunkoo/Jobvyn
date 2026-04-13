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

//Import--after mock...
import { Request, Response, NextFunction } from "express";
import { sql } from "../../utils/db.js";
import { loginUser } from "../../controller/auth.js";
import bcrypt from "bcrypt";
