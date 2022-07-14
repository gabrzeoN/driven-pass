import express, { json } from "express";
import "express-async-errors";
import dotenv from "dotenv";
import chalk from "chalk";

import handleError from "./middlewares/errorHandlerMiddleware.js";
import router from "./routes/index.js";

dotenv.config();

const app = express();
app.use(json());
app.use(router);
app.use(handleError);

const PORT = +process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(chalk.green.bold(`Server is up and running on port ${PORT}!`));
});