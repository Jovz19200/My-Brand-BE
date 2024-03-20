import express from "express";
import { Request, Response } from "express";
import blogRouter from "./routes/blogRouter";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
const app = express();
dotenv.config();



const PORT = process.env.PORT || 5000





mongoose.connect(process.env.mongoURI as string).then(() => {
    console.log("mongoDB Connected!")
}).catch(err => console.log(err));

app.use(express.json())
app.use(express.urlencoded({ extended: false}))
app.use(cors())

app.get("/", (req: Request, res: Response) => {
    res.status(200).json({
        status: "success",
        message: "welcome to my brand backend"
    })
})

app.use("/blogs", blogRouter);


app.use("/*", (req: Request, res: Response) => {
    res.status(404).json({
        status: "error",
        message: "Invalid url"
    })
})

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
