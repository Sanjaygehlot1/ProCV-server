import { AsyncHandler } from "../Utils/AsyncHandler.js";
import { ApiError } from "../Utils/ApiError.js"
import { ApiResponse } from "../Utils/ApiResponse.js"
import { Resume } from "../Models/resume.model.js";
import mongoose from "mongoose";

const SelectTemplate = AsyncHandler(async (req,res)=>{
    const {templateNumber} = req.body

    if(!templateNumber){
        throw new ApiError(401, "No Template found")
    }
    const newResume = await  Resume.create({

        template : templateNumber,
        firstName: "Not Provided",
        email: "not-provided@gmail.com",
        lastName : "",
        phoneNumber :"",
        address: {
            city :"",
            country: "",
            pinCode: ""
        }
    })

    if(!newResume){
        throw new ApiError(401, "Template selection failed. please try again")
    }

    return res.json(new ApiResponse(
        201,
        newResume,
        "Template Selected successfully"
    ))
    


})



const PersonalDetails = AsyncHandler(async (req,res)=>{
    const {resumeId} = req.params
    const {firstName,lastName,email,phoneNumber,city,country,pinCode} = req.body

    if([firstName,email,city,country,pinCode].some((item)=> (item.trim() === "")
    )){
        throw new ApiError(401, "All marked fields are required")

    }

    const storedResume =await Resume.findById(resumeId)

    if(!storedResume){
        throw new ApiError(402,"No resume found")
    }
 
    storedResume.set({
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
    

    await storedResume.save({validateBeforeSave: true})

    const resume = await Resume.findById(storedResume._id)

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

const EducationDetails = AsyncHandler(async (req,res)=>{
    const {name , location,degreeName,field, month ,year} = req.body
    const {resumeId} = req.params

    if(!resumeId){
        throw new ApiError(401,"Id not found")
    }

    if(!(name && degreeName && field)){
        throw new ApiError(401, "All marked fields are required")
    }

    const prevResume = await Resume.findById(resumeId)

    if(!prevResume){
        throw new ApiError(401,"No resume found")
    }


    prevResume.set({
        college:{
            name,
            degree:{
                degreeName,
                field
            },
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
        "Resume part 3 Completed"
    ))

})
const ExperienceDetails = AsyncHandler(async (req,res)=>{
    const {companyName, location,title,remote,currentlyWorking, startMonth,startYear ,endMonth,endYear} = req.body
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

    prevResume.set({
        previousJob:{
            title,
            companyName,
            location,
            remote,
            currentlyWorking,
            startDate: {
                startMonth,
                startYear
            },
            endDate: {
                endMonth,
                endYear
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
        "Resume part 4 Completed"
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
        "Resume part 5 Completed"
    ))

})

const SaveProjects = AsyncHandler(async(req,res)=>{
    const {Projects} = req.body
    const {resumeId} = req.params
    if(!resumeId){
        throw new ApiError(401,"Id not found")
    }

    const prevResume = await Resume.findById(resumeId)

    if(!prevResume){
        throw new ApiError(401,"No resume found")
    }

    prevResume.set({
        projects : Projects
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
        "Projects Completed"
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
        "Resume part 6 Completed"
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
    SelectTemplate,
    PersonalDetails,
    EducationDetails,
    ExperienceDetails,
    SkillsDetails,
    About,
    GetResumeById,
    SaveProjects,
    DeleteResume
}