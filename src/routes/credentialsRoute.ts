import { Router } from "express";
import validSchema from "../middlewares/validSchemaMiddleware.js";
import { createSchema } from "../schemas/credentialsSchema.js";
import { createCredential, getAllCredentials, getCredential, deleteCredential } from "../controllers/credentialsController.js";
import { validToken } from "../middlewares/validTokenMiddleware.js";

const credentialsRoute = Router();

credentialsRoute.post("/credentials", validToken, validSchema(createSchema), createCredential);
credentialsRoute.get("/credentials/:credentialId", validToken, getCredential);
credentialsRoute.get("/credentials", validToken, getAllCredentials);
credentialsRoute.delete("/credentials/:credentialId", validToken, deleteCredential);

export default credentialsRoute;