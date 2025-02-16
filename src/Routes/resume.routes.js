import { Router } from "express";
import {SelectTemplate, About, PersonalDetails, EducationDetails, ExperienceDetails,SaveProjects, SkillsDetails,GetResumeById, ChangeTemplate} from "../Controllers/resume.controller.js";


export const router = Router()

router.route("/select-template").post(SelectTemplate)
router.route("/personal-info/:resumeId").post(PersonalDetails)
router.route("/edu-details/:resumeId").post(EducationDetails)
router.route("/expr/:resumeId").post(ExperienceDetails)
router.route("/change-temp/:resumeId").post(ChangeTemplate)
router.route("/skills/:resumeId").post(SkillsDetails)
router.route("/projects/:resumeId").post(SaveProjects)
router.route("/background/:resumeId").post(About)
router.route("/get-resume/:resumeId").get(GetResumeById)

