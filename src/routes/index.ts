import Router from "express";
import authRoute from "./authRoute.js";
import credentialsRoute from "./credentialsRoute.js";
import annotationsRoute from "./annotationsRoute.js";
import wifisRoute from "./wifisRoute.js";
import cardsRoute from "./cardsRoute.js";

const router = Router();

router.use(authRoute);
router.use(credentialsRoute);
router.use(annotationsRoute);
router.use(wifisRoute);
router.use(cardsRoute);

export default router;