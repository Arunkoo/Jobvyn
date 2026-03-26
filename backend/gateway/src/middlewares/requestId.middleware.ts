import { NextFunction, Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
export function requestIdMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const incomingRequestId = req.headers["x-request-id"];

  const requestId =
    typeof incomingRequestId === "string" ? incomingRequestId : uuidv4();
  req.requestId = requestId;
  req.startTime = Date.now();

  res.setHeader("x-request-id", requestId);
  next();
}
