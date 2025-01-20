import express from 'express';
import isAuthenticated from '../middleware/auth.middleware.js'
import { applyJob, getApplicants, getAppliedJobs, updateApplicationStatus } from '../controllers/application.controller.js';

const router = express.Router();

router.route("/apply/:id").post(isAuthenticated, applyJob);
router.route("/get").get(isAuthenticated, getAppliedJobs);
router.route("/:id/applicants").get(isAuthenticated, getApplicants);
router.route("/status/:id/update").post(isAuthenticated, updateApplicationStatus);

export default router;