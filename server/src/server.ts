import { openAPIRouter } from "@/api-docs/openAPIRouter";
import { healthCheckRouter } from "@/api/healthCheck/healthCheckRouter";
import { userRouter } from "@/api/user/userRouter";
import errorHandler from "@/common/middleware/errorHandler";
import rateLimiter from "@/common/middleware/rateLimiter";
import requestLogger from "@/common/middleware/requestLogger";
import cors from "cors";
import express, { type Express } from "express";
import helmet from "helmet";
import { pino } from "pino";
import { alchemyRouter } from "./api/alchemy/alchemyRouter";
import { basescanRouter } from "./api/basescan/basescanRouter";
import { zeroXRouter } from "./api/zeroX/zeroXRouter";

const logger = pino({ name: "server start" });
const app: Express = express();

// Set the application to trust the reverse proxy
app.set("trust proxy", true);
// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "*", credentials: true, exposedHeaders: ['Set-Authorization'] })); //TODO find out why cors is not working even though I had nginx and self signed certificates
app.use(helmet());
app.use(rateLimiter);

// Request logging
app.use(requestLogger);

// Routes
app.use("/health-check", healthCheckRouter);
app.use("/users", userRouter);
app.use('/alchemy', alchemyRouter);
app.use('/basescan', basescanRouter);
app.use('/0x', zeroXRouter);


// Swagger UI
app.use('/', openAPIRouter);

// Error handlers
app.use(errorHandler());

export { app, logger };
