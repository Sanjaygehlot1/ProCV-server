import { Router } from "express";
import { About, CreateResume, EducationDetails, ExperienceDetails, SkillsDetails,GetResumeById,DeleteResume} from "../Controllers/resume.controller.js";
import { AuthMiddleWare } from "../MiddleWares/AuthMiddleWare.js";

export const router = Router()

router.route("/personal-info").post(AuthMiddleWare,CreateResume)
router.route("/edu-details/:resumeId").post(AuthMiddleWare,EducationDetails)
router.route("/expr/:resumeId").post(AuthMiddleWare,ExperienceDetails)
router.route("/skills/:resumeId").post(AuthMiddleWare,SkillsDetails)
router.route("/background/:resumeId").post(AuthMiddleWare,About)
router.route("/get-resume/:resumeId").get(AuthMiddleWare,GetResumeById)
router.route("/delete/:resumeId").delete(AuthMiddleWare,DeleteResume)

