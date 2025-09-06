import Router from "express";
const router = Router();

import HomeController from "./Controllers/HomeController";
import Createuser from "./Controllers/Users/CreateUser";
import LoginUser from "./Controllers/Users/LoginUser";
import MeUser from "./Controllers/Users/MeUser";
import CaptionExtract from "./Controllers/Caption/CaptionExtract";

import { authMiddleware } from "./Middleware/Auth";

router.get("/", HomeController.index);
router.post("/v1/create", Createuser.create);
router.post("/v1/login", LoginUser.login);
router.get("/v1/me", authMiddleware, MeUser.meUser);
router.post("/v1/caption", authMiddleware, CaptionExtract.index);

export default router;
