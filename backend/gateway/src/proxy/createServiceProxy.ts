import { Request, Response } from "express";
import { Socket } from "net";
import { createProxyMiddleware } from "http-proxy-middleware";

export function createServiceProxy(serviceName: string, target: string) {
  console.log(`[PROXY INIT] service=${serviceName} target=${target}`);
  return createProxyMiddleware({
    target,
    changeOrigin: true,
    xfwd: true,
    proxyTimeout: 10000,
    timeout: 10000,
    pathRewrite: (path, req: Request) => {
      const finalPath = req.originalUrl;
      console.log(
        `[REWRITE] service=${serviceName} original=${req.originalUrl} forwarded=${finalPath}`,
      );
      return finalPath;
    },

    on: {
      // runs BEFORE forwarding request to service
      proxyReq: (proxyReq, req: Request) => {
        console.log(
          `[PROXY FORWARD] → http://${proxyReq.host}${proxyReq.path}`,
        );
        if (req.requestId) {
          proxyReq.setHeader("x-request-id", req.requestId);
        }
        // tell the service this request came from gateway
        proxyReq.setHeader("x-gateway-service", "gateway");
      },

      // runs AFTER service sends response back
      proxyRes: (proxyRes, req: Request) => {
        // stamp the response so client knows it went through gateway
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

        // Socket case — just close the connection and move on
        if (res instanceof Socket) {
          res.destroy();
          return;
        }

        // HTTP case — send a clean error response to the client
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
