import { Router } from "express";
import { validateData } from "../middlewares/validation.middleware";
import { urlSchema } from "../schema/url.schema";
import {
  shortUrlHandler,
  redirectHandler,
  listUrlsHandler,
  analyticsHandler,
} from "../controllers/shortner.controller";
import { customRateLimiter } from "../middlewares/rateLimiter.middleware";

const router = Router();

router.post(
  "/short-url",
  customRateLimiter,
  validateData(urlSchema),
  shortUrlHandler,
);
router.get("/urls", listUrlsHandler);
router.get("/analytics/:code", analyticsHandler);
router.get("/:code", redirectHandler);

export default router;
