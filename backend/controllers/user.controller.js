import { User } from '../models/user.model.js';
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import getDataUri from '../utils/dataUri.js';
import cloudinary from '../utils/cloudinary.js';

export const register = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, password, role } = req.body;
        const file = req.file;
        const fileUri = getDataUri();
        const cloudRes = await cloudinary.uploader.upload(fileUri.content);

        if (!fullname || !email || !phoneNumber || !password || !role) {
            return res.status(400).json({
                message: "All fields required",
                success: false
            });
        };

        const user = await User.findOne(email);
        if (user) {
            return res.status(400).json({
                message: "User already exists",
                success: false
            });
        };

        const hashedPassword = await bcrypt.hash(password, 10);

        await User.create({
            fullname,
            email,
            phoneNumber,
            password: hashedPassword,
            role,
            profile: {
                profilePhoto: cloudRes.secure_url,
            }
        });

        return res.status(201).json({
            message: "Account created successfully",
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

export const login = async (req, res) => {
    try {
        const {email, password, role} = req.body;

        if (!email || !password || !role) {
            return res.status(400).json({
                message: "All fields required",
                success: false
            });
        };

        let user = await User.findOne(email);
        if (!user) {
            return res.status(400).json({
                message: "User does not exists",
                success: false
            });
        };

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!user) {
            return res.status(400).json({
                message: "Incorrect Password",
                success: false
            });
        };

        if (role !== user.role) {
            return res.status(400).json({
                message: "Account with selected role doesn't exists",
                success: false
            });
        }

        const tokenData = {
            userId: user._id
        };
        const token = await jwt.sign(tokenData, process.env.JWT_SECRET, {
            expiresIn: '1d'
        });

        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        }

        return res.status(200).cookie("token", token, {
            maxAge: 1*24*60*60*1000, 
            httpOnly: true, 
            sameSite: 'strict'}).json({
                message: `Welcome back ${user.fullname}`,
                user,
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

export const logout = async (req, res) => {
    try {
        return res.status(200).cookie("token", "", {maxAge: 0}).json({
            message: "Logged out successfully",
            success: true
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false
        });
    }
}

export const updateProfile = async (req, res) => {
    try {
        const {fullname, email, phoneNumber, bio, skills} = req.body;
        if (!email || !skills || !fullname || !bio || !phoneNumber) {
            return res.status(400).json({
                message: "All fields required",
                success: false
            });
        };
        const file = req.file;
        const fileUri = getDataUri(file);
        const cloudRes = await cloudinary.uploader.upload(fileUri.content);

        let skillsArr;
        if (skillsArr) {
            skillsArr = skills.split(",");
        }
        const userId = req.id;  //auth middleware

        let user = User.findById(userId); 
        if (!user) {
            return res.status(400).json({
                message: "User does not exists",
                success: false
            });
        };

        if(fullname) user.fullname = fullname;
        if(email) user.email = email;
        if(phoneNumber) user.phoneNumber = phoneNumber;
        if(bio) user.profile.bio = bio;
        if(skills) user.profile.skills = skillsArr;
        if(cloudRes) {
            user.profile.resume = cloudRes.secure_url;
            user.profile.resumeOriginalName = file.originalname;
        }

        await user.save();

        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        }

        return res.status(200).json({
            message: "profile updated successfully",
            user,
            success: true
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false
        });
    }
}