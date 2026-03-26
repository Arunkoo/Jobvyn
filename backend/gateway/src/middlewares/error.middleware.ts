import { NextFunction, Request, Response } from "express";

export function notFoundMiddleware(req: Request, res: Response) {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.originalUrl}`,
    requestId: req.requestId,
  });
}
//why not use next() in above middleware?--> because above middleware handle the dead end case..

export function errorMiddleware(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  console.error(`[ERROR] id=${req.requestId} ?? "unknown"`, err);

  res.status(500).json({
    success: false,
    message: "Internal server error",
    requestId: req.requestId,
  });
}
