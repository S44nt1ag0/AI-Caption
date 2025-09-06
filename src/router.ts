import Router from "express";
const router = Router();

import HomeController from "./Controllers/HomeController";
import Createuser from "./Controllers/Users/CreateUser";
import LoginUser from "./Controllers/Users/LoginUser";

router.get("/", HomeController.index);
router.post("/v1/create", Createuser.create);
router.post("/v1/login", LoginUser.login);

export default router;
