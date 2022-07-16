import { Router } from "express";
import validSchema from "../middlewares/validSchemaMiddleware.js";
import { createSchema } from "../schemas/credentialsSchema.js";
import { create } from "../controllers/credentialsController.js";
import { validToken } from "../middlewares/validTokenMiddleware.js";
const credentialsRoute = Router();

credentialsRoute.post("/credentials", validToken, validSchema(createSchema), create);
// credentialsRoute.post("/sign-in", validSchema(signInSchema), signIn);

export default credentialsRoute;