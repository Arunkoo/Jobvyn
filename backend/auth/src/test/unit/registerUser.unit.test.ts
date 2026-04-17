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
