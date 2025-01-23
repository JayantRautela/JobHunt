import express from 'express';
import isAuthenticated from '../middleware/auth.middleware.js';
import { getCompany, getCompanyById, registerCompany, updateCompanyInformation } from '../controllers/company.controller.js';

const router = express.Router();

router.route('/register').post(isAuthenticated, registerCompany);
router.route('/get').get(isAuthenticated, getCompany);
router.route('/get/:id').get(isAuthenticated, getCompanyById);
router.route('/update/:id').put(isAuthenticated, isAuthenticated, updateCompanyInformation);

export default router;