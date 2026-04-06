import { Request, Response } from "express";
import { Socket } from "net";
import { createProxyMiddleware } from "http-proxy-middleware";

export function createServiceProxy(
  serviceName: string,
  target: string,
  prefix: string,
) {
  console.log(`[PROXY INIT] service=${serviceName} target=${target}`);
  return createProxyMiddleware({
    target,
    changeOrigin: true,
    xfwd: true,
    proxyTimeout: 10000,
    timeout: 10000,
    pathRewrite: (path, req: Request) => {
      const strippedPath = req.originalUrl.replace(prefix, "") || "/";
      console.log(
        `[REWRITE] service=${serviceName} original=${req.originalUrl} forwarded=${strippedPath}`,
      );
      return strippedPath;
    },

    on: {
      proxyReq: (proxyReq, req: Request) => {
        console.log(
          `[PROXY FORWARD] → ${target}${proxyReq.path}`, // ✅ also fixed log to show full URL
        );
        if (req.requestId) {
          proxyReq.setHeader("x-request-id", req.requestId);
        }
        proxyReq.setHeader("x-gateway-service", "gateway");
      },

      proxyRes: (proxyRes, req: Request) => {
        proxyRes.headers["x-gateway-proxy"] = "true";
        proxyRes.headers["x-proxied-service"] = serviceName;
        console.log(
          `[PROXY] id=${req.requestId} service=${serviceName} status=${proxyRes.statusCode} path=${req.originalUrl}`,
        );
      },

      error: (err, req: Request, res: Response | Socket) => {
        console.error(
          `[PROXY ERROR] id=${req.requestId} service=${serviceName} message=${err.message}`,
        );
        if (res instanceof Socket) {
          res.destroy();
          return;
        }
        if (!res.headersSent) {
          res.status(502).json({
            success: false,
            message: `${serviceName} service unavailable`,
            requestId: req.requestId,
          });
        }
      },
    },
  });
}
