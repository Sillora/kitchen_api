import multer from "multer";

// Simpan di memory sebagai buffer (bukan di disk) agar bisa langsung diupload ke Cloudinary
const storage = multer.memoryStorage();

export const uploadSingleImage = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Max 5MB
}).single("image"); // 'image' adalah nama field di form-data Postman