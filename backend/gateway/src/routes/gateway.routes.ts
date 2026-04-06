import { Router } from "express";
import { SERVICES } from "../config/service.js";
import { createServiceProxy } from "../proxy/createServiceProxy.js";

const router = Router();
console.log("Gateway service registry:", SERVICES);

router.use(
  SERVICES.auth.prefix,
  createServiceProxy(
    SERVICES.auth.name,
    SERVICES.auth.target,
    SERVICES.auth.prefix,
  ),
);

router.use(
  SERVICES.user.prefix,
  createServiceProxy(
    SERVICES.user.name,
    SERVICES.user.target,
    SERVICES.user.prefix,
  ),
);

router.use(
  SERVICES.utils.prefix,
  createServiceProxy(
    SERVICES.utils.name,
    SERVICES.utils.target,
    SERVICES.utils.prefix,
  ),
);

router.use(
  SERVICES.payment.prefix,
  createServiceProxy(
    SERVICES.payment.name,
    SERVICES.payment.target,
    SERVICES.payment.prefix,
  ),
);

router.use(
  SERVICES.job.prefix,
  createServiceProxy(
    SERVICES.job.name,
    SERVICES.job.target,
    SERVICES.job.prefix,
  ),
);

export default router;
