import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company',
        required: true
    },
    created_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    location: {
        type: String,
        required: true
    },
    salary: {
        type: Number,
        required: true
    },
    type: {
        type: String,
        enum: ['full-time', 'part-time', 'internship'],
        required: true
    },
    experience: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    requirements: [
        {
            type: String
        }
    ],
    applicants: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    positions: {
        type: Number,
        required: true
    }
}, { timestamps: true });

export const Job = mongoose.model('Job', jobSchema);