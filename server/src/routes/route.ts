import { Router } from "express";
import { validateData } from "../middlewares/validation.middleware";
import { urlSchema } from "../schema/url.schema";
import { shortUrlHandler, redirectHandler, listUrlsHandler } from "../controllers/shortner.controller";

const router = Router();

router.post("/short-url", validateData(urlSchema), shortUrlHandler);
router.get("/urls", listUrlsHandler);
// router.get("/analytics/:code", analyticsHandler);
router.get("/:code", redirectHandler);

export default router;