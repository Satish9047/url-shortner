import { Router } from "express";
import { validateData } from "../middlewares/validation.middleware";
import { urlSchema } from "../schema/url.schema";
import { shortUrlHandler } from "../controllers/shortner.controller";

const shortUrlRouter = Router();

shortUrlRouter.post("/", validateData(urlSchema), shortUrlHandler);

export default shortUrlRouter;
