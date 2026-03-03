import express from "express";
import { getProject, addProject, updateProject, deleteProject } from "../controllers/projectController.js";
import { adminAuth } from "../middleware/adminAuth.js";

const router = express.Router();

router.get('/', getProject);
router.post('/', adminAuth, addProject);
router.put("/:id", updateProject);
router.delete("/:id", deleteProject);

export default router;