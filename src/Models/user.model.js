import mongoose, { Schema } from "mongoose";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    fullName: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    refreshToken: {
        type: String
    },
   
}, {
    timestamps: true
})

UserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password,10)
    next()
})

UserSchema.methods.IsPasswordCorrect = async function (password){
    return await bcrypt.compare(password, this.password)
}

UserSchema.methods.GenerateAccessToken =async function(){
    return jwt.sign(
        {
            _id: this._id,
            username: this.username,
            fullName: this.fullName,
            email: this.email
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }

    )
}
UserSchema.methods.GenerateRefreshToken = async function() {
    return jwt.sign(
        {
            _id: this._id,
            
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }

    )
}

const User = mongoose.model("User", UserSchema)

export { User }