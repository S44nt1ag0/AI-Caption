import Router from "express";
const router = Router();

import HomeController from "./Controllers/HomeController";
import LoginController from "./Controllers/LoginController";

router.get("/", HomeController.index);
router.get("/user/auth", LoginController.login);

export default router;
