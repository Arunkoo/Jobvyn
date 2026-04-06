import { Router } from "express";
import { SERVICES } from "../config/service.js";
import { createServiceProxy } from "../proxy/createServiceProxy.js";

const router = Router();
console.log("Gateway service registry:", SERVICES);

router.use(
  SERVICES.auth.prefix,
  createServiceProxy(SERVICES.auth.name, SERVICES.auth.target),
);
router.use(
  SERVICES.user.prefix,
  createServiceProxy(SERVICES.user.name, SERVICES.user.target),
);
router.use(
  SERVICES.utils.prefix,
  createServiceProxy(SERVICES.utils.name, SERVICES.utils.target),
);
router.use(
  SERVICES.payment.prefix,
  createServiceProxy(SERVICES.payment.name, SERVICES.payment.target),
);
router.use(
  SERVICES.job.prefix,
  createServiceProxy(SERVICES.job.name, SERVICES.job.target),
);

export default router;
