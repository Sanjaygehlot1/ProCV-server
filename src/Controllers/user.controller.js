import { User } from "../Models/user.model.js";
import { AsyncHandler } from "../Utils/AsyncHandler.js";
import { ApiError } from "../Utils/ApiError.js"
import bcrypt from "bcryptjs"
import { ApiResponse } from "../Utils/ApiResponse.js"
import mongoose from "mongoose";

const GenerateAccessAndRefreshToken = async (UserId) => {

    try {
        const user = await User.findById(UserId)


        if (!user) {
            throw new ApiError(401, "user not found")
        }
        const AccessToken = await user.GenerateAccessToken()
        const RefreshToken = await user.GenerateRefreshToken()
        user.refreshToken = RefreshToken
        await user.save({ validateBeforeSave: true })

        return { AccessToken, RefreshToken }
    } catch (error) {
        console.log(error)
    }

}

const RegisterUser = AsyncHandler(async (req, res) => {

    const { username, email, password, fullName } = req.body

    if ([fullName, email, password, username].some((value) => value?.trim() === "")) {
        throw new ApiError(400, "All Fields are required!!")
    }

    const ExistingUser = await User.findOne({
        $or: [
            { email: email },
            { username: username }
        ]
    })

    if (ExistingUser) {
        throw new ApiError(400, "User already exists with the same email or username.")
    }

    const hashedPass = await bcrypt.hash(password, 10)

    const NewUser = await User.create({
        username: username.toLowerCase(),
        email: email.toLowerCase(),
        password: hashedPass,
        fullName
    })

    if (!NewUser) {
        throw new ApiError(400, "Error registering user")
    }

    const user = await User.findById(NewUser._id).select("-password -refreshToken")

    return res
        .status(201)
        .json(
            new ApiResponse(
                201,
                user,
                "User Registered Successfully"
            )
        )


})

const LoginUser = AsyncHandler(async (req, res) => {
    const { username, email, password } = req.body

    if (!(username || email)) {
        throw new ApiError(400, "Username or Email is required")
    }

    if (!password) {
        throw new ApiError(400, "Password is required")

    }

    const user = await User.findOne({
        $or: [{ username }, { email }]
    })

    if (!user) {
        throw new ApiError(400, "User does not exist")

    }
    const passCorrect = await user.IsPasswordCorrect(password)

    if (!passCorrect) {
        throw new ApiError(401, "Password Incorrect")
    }

    const { RefreshToken, AccessToken } = await GenerateAccessAndRefreshToken(user._id)

    const loggedInUser = await User.findById(user._id).select("-password  -refreshToken")

    const options = {
        Httponly: true,
        secure: true,
        sameSite: 'none'
    }

    return res
        .status(200)
        .cookie("AccessToken", AccessToken, options)
        .cookie("RefreshToken", RefreshToken, options)
        .json(new ApiResponse(
            200,
            loggedInUser,
            "user logged in successfully"
        ))

})

const LogOutUser = AsyncHandler(async (req, res) => {

    await User.findByIdAndUpdate(
        req.user._id,
        {
            $set: {
                refreshToken: undefined
            }
        },
        {
            new: true
        }
    )


    const options = {
        httponly: true,
        secure: true,
        sameSite: 'none'
    }

    return res
        .status(200)
        .clearCookie("AccessToken", options)
        .clearCookie("RefreshToken", options)
        .json(
            new ApiResponse(200, {}, "User Logged Out Successfully")
        )


})

const GetUserResumes = AsyncHandler(async (req, res) => {
    const userId = req.user?._id

    if (!mongoose.isValidObjectId(userId)) {
        throw new ApiError(400, "Id invalid")
    }

    if (!userId) {
        throw new ApiError(400, "Id not found")

    }

    const user = await User.findById(userId)

    if (!user) {
        throw new ApiError(400, "User not found")

    }

    const UserResumes = await User.aggregate([
        {
            $match: {
                _id:new  mongoose.Types.ObjectId(userId)
            }
        },
        {
            $lookup: {
                from: "resumes",
                localField: "_id",
                foreignField: "owner",
                as: "Resumes"

            }
        },
        {
            $project: {
                username: 1,
                email: 1,
                createdAt: 1,
                updatedAt: 1,
                Resumes: 1
            }
        }
    ])

    if (!UserResumes) {
        throw new ApiError(400, "Resumes not found")
    }

    return res
    .status(200)
    .json(new ApiResponse(
        200,
        UserResumes,
        "All resumes fetched successfully"
    ))



})

export {
    RegisterUser,
    LoginUser,
    LogOutUser,
    GetUserResumes

}