import { Router } from "express";
import validSchema from "../middlewares/validSchemaMiddleware.js";
import { createSchema } from "../schemas/cardsSchema.js";
import { createCard } from "../controllers/cardsController.js";
import { validToken } from "../middlewares/validTokenMiddleware.js";

const cardsRoute = Router();

cardsRoute.post("/cards", validToken, validSchema(createSchema), createCard);
// cardsRoute.get("/cards/:cardId", validToken, getCard);
// cardsRoute.get("/cards", validToken, getAllCards);
// cardsRoute.delete("/cards/:cardId", validToken, deleteCard);

export default cardsRoute;