import { Request, Response, Router } from "express";
import shortUrlRouter from "./shorturl.route";

const router = Router();

router.use("/short-url", shortUrlRouter);

export default router;