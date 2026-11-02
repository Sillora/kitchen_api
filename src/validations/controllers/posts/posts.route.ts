import { Router } from "express";
import { createPost } from "../../controllers/posts/post.controller";
import { uploadSingleImage } from "../../../middleware/upload.middleware";

const router = Router();

// Gunakan middleware uploadSingleImage sebelum controller
router.post("/", uploadSingleImage, createPost);

export default router;