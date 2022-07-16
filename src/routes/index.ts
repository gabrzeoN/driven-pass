import Router from "express";
import authRoute from "./authRoute.js";
import credentialsRoute from "./credentialsRoute.js";

const router = Router();

router.use(authRoute);
router.use(credentialsRoute);

export default router;