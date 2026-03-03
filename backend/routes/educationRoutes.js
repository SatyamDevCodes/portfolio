import express from 'express';
import { getEducation, addEducation, updateEducation, deleteEducation } from '../controllers/educationController.js';
import { adminAuth } from '../middleware/adminAuth.js';

const router = express.Router();

router.get('/', getEducation);
router.post('/', adminAuth, addEducation);
router.put('/:id', updateEducation);
router.delete('/:id', deleteEducation);

export default router;