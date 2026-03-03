import express from 'express';
import { sendContact, getContact, deleteContact } from '../controllers/contactController.js';

const router = express.Router();

router.post("/", sendContact);
router.get("/", getContact);
router.delete("/:id", deleteContact);

export default router;