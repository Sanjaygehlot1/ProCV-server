import { AsyncHandler } from "../Utils/AsyncHandler.js";
import { ApiError } from "../Utils/ApiError.js";
import { User } from "../Models/user.model.js";
import jwt from 'jsonwebtoken'


const AuthMiddleWare = AsyncHandler(async (req, res, next) => {

    const AccessToken = await req.cookies?.AccessToken
    if (!AccessToken) {
        throw new ApiError(401, "Unauthorized Access")
    }
    const decodedToken = jwt.verify(AccessToken, process.env.ACCESS_TOKEN_SECRET)
    if (!decodedToken) {
        throw new ApiError(401, "Unauthorized Access")

    }

    const user = await User.findById(decodedToken._id)

    if (!user) {
        throw new ApiError(401, "User not found")

    }

    req.user = user
    next()

})

export {
    AuthMiddleWare
}