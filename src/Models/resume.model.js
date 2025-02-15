import mongoose, { Schema } from "mongoose";

const ResumeSchema = new Schema({
    owner: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    },
    template: {
        type: String,
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
            pinCode: String
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
                degreeName: {
                    type: String,
                    required: true
                },
                field: {
                    type: String,
                    required: true
                }
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
            remote: {
                type: Boolean
            },
            currentlyWorking: {
                type: Boolean
            },
            startDate: {
                startMonth: String,
                startYear: String
            },
            endDate: {
                endMonth: String,
                endYear: String
            }
        }
    },
    skills: {
        type: [String],
    },
    projects: [
        {
            title: String,
            description: String,
            link: String
        }
    ],
    about: {
        type: String
    }


})

const Resume = mongoose.model("Resume", ResumeSchema)

export {
    Resume
}