import express from "express";
import { Request, Response } from "express";
import blogRouter from "./routes/blogRouter";
import userRouter from "./routes/userRouter";
import commentRouter from "./routes/commentRouter";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import swaggerUi from "swagger-ui-express";
import docRouter from "./swagger_doc/swagger";
dotenv.config();
 const app = express();

export { app };
const PORT = process.env.PORT || 5000


mongoose.connect(process.env.mongoURI as string).then(() => {
   
}).catch(err => console.log(err));

app.use('/api-docs', docRouter);
app.use(express.json())
app.use(express.urlencoded({ extended: false}))
app.use(cors())

app.get("/", (req: Request, res: Response) => {
    res.status(200).json({
        status: "success",
        message: "welcome to My Brand Backend"
    })
})

app.use("/api/v1/blogs", blogRouter);
app.use("/api/v1/blogs", commentRouter)
app.use("/api/v1/users", userRouter)


app.use("/*", (req: Request, res: Response) => {
    res.status(404).json({
        status: "error",
        message: "Invalid url"
    })
})

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
