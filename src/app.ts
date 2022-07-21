import express, { json } from "express";
import "express-async-errors";

import handleError from "./middlewares/errorHandlerMiddleware.js";
import router from "./routes/index.js";

const app = express();
app.use(json());
app.use(router);
app.use(handleError);

export default app;
