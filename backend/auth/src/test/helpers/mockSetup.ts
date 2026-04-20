import { Request, Response, NextFunction } from "express";

export const mockRequest = (
  body = {},
  params = {},
  file?: any,
): Partial<Request> => ({ body, params, file });

export const mockResponse = () => {
  const res: Partial<Response> = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

export const mockNext: NextFunction = jest.fn();
