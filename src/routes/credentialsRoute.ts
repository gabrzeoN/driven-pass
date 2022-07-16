import { Router } from "express";
import validSchema from "../middlewares/validSchemaMiddleware.js";
import { createSchema } from "../schemas/credentialsSchema.js";
import { createCredential, getAllUserCredentials } from "../controllers/credentialsController.js";
import { validToken } from "../middlewares/validTokenMiddleware.js";
const credentialsRoute = Router();

credentialsRoute.post("/credentials", validToken, validSchema(createSchema), createCredential);
credentialsRoute.get("/credentials", validToken, getAllUserCredentials);

export default credentialsRoute;