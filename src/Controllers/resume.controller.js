import { AsyncHandler } from "../Utils/AsyncHandler.js";
import { ApiError } from "../Utils/ApiError.js"
import { ApiResponse } from "../Utils/ApiResponse.js"
import { Resume } from "../Models/resume.model.js";
import mongoose from "mongoose";
import { User } from "../Models/user.model.js";

const CreateResume = AsyncHandler(async (req,res)=>{
    const userId = req.user?._id
    const {template,firstName,lastName,email,phoneNumber,city,country,pinCode} = req.body
    if(!userId){
        throw new ApiError(401, "Unauthorized Access")

    }

    if(!template){
        throw new ApiError(401, "Please select a template first")

    }

    if([firstName,email,city,country,pinCode].some((item)=> (item.trim() === "")
    )){
        throw new ApiError(401, "All marked fields are required")

    }

    const resume = await Resume.create({
        owner: req.user?._id,
        template,
        firstName,
        lastName : lastName || null,
        email,
        phoneNumber : phoneNumber || null,
        address: {
            city,
            country,
            pinCode
        }
    })



    if(!resume){
        throw new ApiError(401, "Error creating resume")

    }
    


    return res
    .status(201)
    .json(new ApiResponse(
        201,
        resume,
        "Resume 1st part created successfully"
    ))


})

const EducationDetails = AsyncHandler(async (req,res)=>{
    const {collegeName , location,degree, month ,year} = req.body
    const {resumeId} = req.params

    if(!resumeId){
        throw new ApiError(401,"Id not found")
    }

    if(!(collegeName && degree)){
        throw new ApiError(401, "All marked fields are required")
    }

    const prevResume = await Resume.findById(resumeId)

    if(!prevResume){
        throw new ApiError(401,"No resume found")
    }

    if(prevResume._id !== req.user?._id){
        throw new ApiError(401,"you dont have permission to edit this file")
    }

    prevResume.set({
        college:{
            name : collegeName,
            degree,
            location,
            graduation: {
                month,
                year
            }
        }
    })

    await prevResume.save({validateBeforeSave: true})

    const resume = await Resume.findById(prevResume._id)

    if(!resume){
        throw new ApiError(401,"No resume found")
    }

    return res
    .status(200)
    .json(new ApiResponse(
        200,
        resume,
        "Resume part 2 Completed"
    ))

})
const ExperienceDetails = AsyncHandler(async (req,res)=>{
    const {companyName, location,title, startDate ,endDate} = req.body
    const {resumeId} = req.params

    if(!resumeId){
        throw new ApiError(401,"Id not found")
    }

    if(!title){
        throw new ApiError(401, "All marked fields are required")
    }

    const prevResume = await Resume.findById(resumeId)

    if(!prevResume){
        throw new ApiError(401,"No resume found")
    }

    if(prevResume._id !== req.user?._id){
        throw new ApiError(401,"you dont have permission to edit this file")
    }

    prevResume.set({
        previousJob:{
            title,
            companyName,
            location,
            startDate,
            endDate
        }
    })

    await prevResume.save({validateBeforeSave: true})

    const resume = await Resume.findById(prevResume._id)

    if(!resume){
        throw new ApiError(401,"No resume found")
    }

    return res
    .status(200)
    .json(new ApiResponse(
        200,
        resume,
        "Resume part 3 Completed"
    ))

})
const SkillsDetails = AsyncHandler(async (req,res)=>{
    const {Skills} = req.body
    const {resumeId} = req.params

    if(!resumeId){
        throw new ApiError(401,"Id not found")
    }

    const prevResume = await Resume.findById(resumeId)

    if(!prevResume){
        throw new ApiError(401,"No resume found")
    }
    if(prevResume._id !== req.user?._id){
        throw new ApiError(401,"you dont have permission to edit this file")
    }

    prevResume.set({
        skills : Skills
    })

    await prevResume.save({validateBeforeSave: true})

    const resume = await Resume.findById(prevResume._id)

    if(!resume){
        throw new ApiError(401,"No resume found")
    }
    
    return res
    .status(200)
    .json(new ApiResponse(
        200,
        resume,
        "Resume part 4 Completed"
    ))

})
const About = AsyncHandler(async (req,res)=>{
    const {background} = req.body
    const {resumeId} = req.params

    if(!resumeId){
        throw new ApiError(401,"Id not found")
    }

    const prevResume = await Resume.findById(resumeId)

    if(!prevResume){
        throw new ApiError(401,"No resume found")
    }
    console.log(prevResume.owner)
    console.log(req.user?._id)
    if(prevResume.owner.toString() !== new mongoose.Types.ObjectId(req.user?._id).toString()){
        throw new ApiError(401,"you dont have permission to edit this file")
    }

    prevResume.set({
        about : background?.toString()
    })

    await prevResume.save({validateBeforeSave: true})

    const resume = await Resume.findById(prevResume._id)

    if(!resume){
        throw new ApiError(401,"No resume found")
    }

    return res
    .status(200)
    .json(new ApiResponse(
        200,
        resume,
        "Resume part 5 Completed"
    ))

})

const GetResumeById = AsyncHandler(async (req,res)=>{
    const {resumeId} = req.params

    if(!mongoose.isValidObjectId(resumeId)){
        throw new ApiError(400, "Id invalid")
    }

    if(!resumeId){
        throw new ApiError(400, "Id not found")

    }

    const resume = await Resume.findById(resumeId)

    if(!resume){
        throw new ApiError(400, "Resume not found")
    }

    return res
    .status(200)
    .json(new ApiResponse(
        200,
        resume,
        "Resume fetched successfully"
    ))
})

const DeleteResume = AsyncHandler(async (req,res)=>{
    const {resumeId} = req.params

    if(!mongoose.isValidObjectId(resumeId)){
        throw new ApiError(400, "Id invalid")
    }

    if(!resumeId){
        throw new ApiError(400, "Id not found")

    }

    const resume = await Resume.findByIdAndDelete(resumeId)

    
    if(!resume){
        throw new ApiError(400, "Resume not found")
    }

    return res
    .status(200)
    .json(new ApiResponse(
        200,
        {},
        "Resume deleted successfully"
    ))
})


export {
    CreateResume,
    EducationDetails,
    ExperienceDetails,
    SkillsDetails,
    About,
    GetResumeById,
    DeleteResume
}