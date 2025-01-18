import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    fullname: {
        type: Stinrg,
        required: true
    },
    email: {
        type: Stinrg,
        required: true,
        unique: true
    },
    phoneNumber: {
        type: Stinrg,
        required: true
    },
    password: {
        type: Stinrg,
        required: true
    },
    role: {
        type: Stinrg,
        enum: ['student', 'recruiter'],
        required: true,
    },
    profile: {
        bio: {
            type: String
        },
        skills: [
            {
                type: String
            }
        ],
        resume: {
            type: String // URL
        },
        resumeOriginalName: {
            type: String
        },
        company: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Company'
        },
        profilePhoto: {
            type: String,
            default: ""
        },
    }
}, { timestamps: true });

export const User = mongoose.model('User', userSchema);