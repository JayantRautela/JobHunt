import { Company } from "../models/company.model.js";

export const registerCompany = async (req, res) => {
    try {
        const { companyName } = req.body;
        if (!companyName) {
            return res.status(400).json({
                message: "Company Name is Required",
                success: false
            });
        };
        let company = await Company.findOne({name: companyName});
        if (company) {
            return res.status(400).json({
                message: "Company with same name already exists",
                success: false
            });
        };
        company = await Company.create({
            name: companyName,
            userId: req.id
        });
        
        return res.status(201).json({
            message: "Company Registered Successfully",
            company,
            success: true
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false
        });
    }
}

export const getCompany = async (req, res) => {
    try {
        const userId = req.id;
        const companies = await Company.find({userId});
        if(!companies) {
            return res.status(404).json({
                message: "Company not found",
                success: false
            });
        };
        return res.status(200).json({
            companies,
            success: true
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false
        });
    }
}

export const getCompanyById = async (req, res) => {
    try {
        const companyId = req.params.id;
        const company = await Company.findById(companyId);
        if (!company) {
            return res.status(404).json({
                message: "Company not found",
                success: false
            });
        };
        return res.status(200).json({
            company,
            success: true
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false
        });
    }
}

export const updateCompanyInformation = async (req, res) => {
    try {
        const {name, description, website, location} = req.body;

        const updateData = { name, description, website, location};

        const company = await Company.findByIdAndUpdate(req.params.id, updateData, { new: true });

        if (!company) {
            return res.status(404).json({
                message: "Company not found.",
                success: false
            })
        }
        return res.status(200).json({
            message:"Company information updated.",
            success:true
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false
        });
    }
}