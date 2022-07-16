import { Router } from "express";
import validSchema from "../middlewares/validSchemaMiddleware.js";
import { createSchema } from "../schemas/annotationsSchema.js";
import { createAnnotation } from "../controllers/annotationsController.js";
import { validToken } from "../middlewares/validTokenMiddleware.js";

const annotationsRoute = Router();

annotationsRoute.post("/annotations", validToken, validSchema(createSchema), createAnnotation);
// annotationsRoute.get("/annotations/:annotationId", validToken, getAnnotation);
// annotationsRoute.get("/annotations", validToken, getAllAnnotations);
// annotationsRoute.delete("/annotations/:annotationId", validToken, deleteAnnotation);

export default annotationsRoute;