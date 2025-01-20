import Job from '../models/job.model.js';

export const postJob = async (req, res) => {
    try {
        const {title, description, requirements, salary, location, jobType, experience, position, companyId} = req.body;
        const userId = req.id;

        if (!title || !description || !requirements || !salary || !location || !jobType || !experience || !position || !companyId) {
            return res.status(400).json({
                message: 'All fields are required',
                success: false
            });
        };

        const job = await Job.create({
            title, 
            description, 
            requirements: requirements.split(','), 
            salary: Number(salary),
            location, 
            jobType, 
            experience: Number(experience), 
            position, 
            company: companyId,
            created_by: userId
        });

        return res.status(201).json({
            message: 'Job created successfully',
            success: true,
            job
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    };
}

export const getAllJobs = async (req, res) => {
    try {
        const keyword = req.query.keyword || "";
        const query = {
            $or: [
                {title: {$regex: keyword, $options: "i"}},
                {description: {$regex: keyword, $options: "i"}},
            ]
        };

        const job = await Job.find(query);

        if (!job) {
            return res.status(404).json({
                message: "No jobs found",
                success: false
            });
        };

        return res.status(200).json({
            job,
            success: true
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        })
    }
}

export const getJobById = async (req, res) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId);

        if (!job) {
            return res.status(404).json({
                message: "No job found",
                success: false
            });
        };

        return res.status(200).json({
            job,
            success: true
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "internal server error",
            success: false
        });
    };
}

export const getJobByAdmin = async (req, res) => {
    try {
        const adminId = req.id;
        const jobs = await Job.findById({created_by: adminId});

        if (!jobs) {
            return res.status(404).json({
                message: "No jobs found",
                success: false
            });
        };

        return res.status(200).json({
            jobs,
            success: true
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "internal server error",
            success: false
        });
    }
}