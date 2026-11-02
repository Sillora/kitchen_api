import { Request, Response } from "express";
import { db } from "../../../config/db";
import { postsTable } from "../../../config/schema";
import { eq } from "drizzle-orm";
import { uploadToCloudinary } from "../../../services/cloudinary.service";
// import { createPostSchema } from "../../validations/post.validation"; // Opsional

export const createPost = async (req: Request, res: Response) => {
  try {
    // 1. Ambil data dari body (sesuaikan dengan validasi kamu)
    const { userId, title, content } = req.body; 
    
    let imageUrl: string | undefined;
    let imagePublicId: string | undefined;

    // 2. Jika ada file yang di-upload, kirim ke Cloudinary
    if (req.file) {
      const uploadResult = await uploadToCloudinary(req.file.buffer);
      imageUrl = uploadResult.secure_url;
      imagePublicId = uploadResult.public_id;
    }

    // 3. Insert ke Database
    const [insertedPost] = await db
      .insert(postsTable)
      .values({
        userId,
        title,
        content,
        imageUrl,
        imagePublicId,
      })
      .$returningId();

    // 4. Ambil data post yang baru dibuat
    const newPost = await db.query.postsTable.findFirst({
      where: eq(postsTable.id, insertedPost.id),
    });

    return res.status(201).json({
      success: true,
      message: "Post created successfully",
      data: { post: newPost },
    });

  } catch (error) {
    console.error("Create post error:", error);
    return res.status(500).json({
      success: false,
      message: "Terjadi kesalahan pada server",
      error: error instanceof Error ? error.message : error,
    });
  }
};