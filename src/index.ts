import express, { Request, Response } from "express";
import authRouter from "./routes/auth.route"; 

// 1. TAMBAHKAN IMPORT POSTS ROUTER INI
// Sesuaikan path ini dengan lokasi file posts.route.ts kamu
import postsRouter from "./validations/controllers/posts/posts.route"; 

const app = express();
const port = 5000;

app.use(express.json());

app.use("/api/v1/auth", authRouter);


app.use("/api/v1/posts", postsRouter); 

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});