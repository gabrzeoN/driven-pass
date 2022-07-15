import { Router } from "express";
import validSchema from "../middlewares/validSchemaMiddleware.js";
import { signUpSchema, signInSchema } from "../schemas/authSchema.js";
import { signUp, signIn } from "../controllers/authController.js";

const authRoute = Router();

authRoute.post("/sign-up", validSchema(signUpSchema), signUp);
authRoute.post("/sign-in", validSchema(signInSchema), signIn);

export default authRoute;