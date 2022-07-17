import { Router } from "express";
import validSchema from "../middlewares/validSchemaMiddleware.js";
import { createSchema } from "../schemas/wifisSchema.js";
import { createWifi, getWifi, getAllWifis } from "../controllers/wifisController.js";
import { validToken } from "../middlewares/validTokenMiddleware.js";

const wifisRoute = Router();

wifisRoute.post("/wifis", validToken, validSchema(createSchema), createWifi);
wifisRoute.get("/wifis/:wifiId", validToken, getWifi);
wifisRoute.get("/wifis", validToken, getAllWifis);
// wifisRoute.delete("/wifis/:annotationId", validToken, deleteWifi);

export default wifisRoute;