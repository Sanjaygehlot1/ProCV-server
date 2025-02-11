import { Router } from "express";
import {SelectTemplate, About, PersonalDetails, EducationDetails, ExperienceDetails, SkillsDetails,GetResumeById,DeleteResume} from "../Controllers/resume.controller.js";
import { AuthMiddleWare } from "../MiddleWares/AuthMiddleWare.js";

export const router = Router()

router.route("/select-template").post(AuthMiddleWare,SelectTemplate)
router.route("/personal-info/:resumeId").post(AuthMiddleWare,PersonalDetails)
router.route("/edu-details/:resumeId").post(AuthMiddleWare,EducationDetails)
router.route("/expr/:resumeId").post(AuthMiddleWare,ExperienceDetails)
router.route("/skills/:resumeId").post(AuthMiddleWare,SkillsDetails)
router.route("/background/:resumeId").post(AuthMiddleWare,About)
router.route("/get-resume/:resumeId").get(AuthMiddleWare,GetResumeById)
router.route("/delete/:resumeId").delete(AuthMiddleWare,DeleteResume)

