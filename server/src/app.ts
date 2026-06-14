import express, { Application, Request, Response, NextFunction } from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import apiRouter from "./routes/route";
import { redirectHandler } from "./controllers/shortner.controller";

const app: Application = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(morgan("dev"));

app.get("/api/v1/test", (req: Request, res: Response) => {
  res.status(200).json({
    status: "success",
    message: "express server is running as expected",
    data: null,
    success: true,
  });
});

app.use("/api/v1", apiRouter);
app.get("/:code", redirectHandler);

// Centralized Global Error Handling Middleware
app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  console.error("Global Error:", error.message);

  const status =
    "status" in error && typeof (error as any).status === "number"
      ? (error as any).status
      : 500;
  const data = "data" in error ? (error as any).data : null;

  res.status(status).json({
    status: "error",
    message: error.message || "Internal Server Error",
    data: data ?? null,
    success: false,
  });
});

export default app;
