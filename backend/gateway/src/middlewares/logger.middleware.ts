import { NextFunction, Request, Response } from "express";

export function loggerMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const requestId = req.requestId ?? "unknown";
  const startTime = req.startTime ?? Date.now();
  if (req.path === "/.well-known/appspecific/com.chrome.devtools.json") {
    return next(); // skip logging
  }
  console.log(
    `[REQ] id=${requestId} method=${req.method} path=${req.originalUrl} ip=${req.ip}`,
  );

  res.on("finish", () => {
    const duration = Date.now() - startTime;
    console.log(
      `[RES] id=${requestId} method=${req.method} path=${req.originalUrl} status=${res.statusCode} duration=${duration}ms`,
    );
  });

  next();
}
