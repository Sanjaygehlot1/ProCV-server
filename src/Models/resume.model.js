import mongoose, { Schema } from "mongoose";

const ResumeSchema = new Schema({
    owner: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    },
    template: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    phoneNumber: {
        type: String,
        trim: true
    },
    address: {
        type: {
            city: String,
            country: String,
            pinCode: Number
        },
        required: true
    },
    college: {
        type: {
            name: {
                type: String,
                required: true
            },
            location: String,
            degree: {
                type: String,
                required: true
            },
            graduation: {
                month: String,
                year: String
            }
        }
    },
    previousJob: {
        type: {
            title: {
                type: String,
                required: true
            },
            location: {
                type: String
            },
            companyName: {
                type: String,
                
            },
            startDate: String,
            endDate: String
        }
    },
    skills: {
        type: [String],
    },
    about: {
        type: String
    }


})

const Resume = mongoose.model("Resume", ResumeSchema)

export {
    Resume
}