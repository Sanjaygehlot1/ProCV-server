import { Router } from "express";
import { GetUserResumes, LoginUser, LogOutUser, RegisterUser } from "../Controllers/user.controller.js";
import { AuthMiddleWare } from "../MiddleWares/AuthMiddleWare.js";

export const router = Router()

router.route("/register").post(RegisterUser)
router.route("/login").post(LoginUser)
router.route("/logout").post(LogOutUser)
router.route("/my-resumes").get(AuthMiddleWare,GetUserResumes)