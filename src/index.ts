import express from "express";
import { Request, Response } from "express";
import blogRouter from "./routes/blogRouter";
import userRouter from "./routes/userRouter";
import commentRouter from "./routes/commentRouter";
import QueriesRouter from "./routes/queriesRouter";
import LikeRouter from "./routes/likeRouter";

import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import docRouter from "./swagger_doc/swagger";
import LikeRouter from "./routes/likeRouter";
import like from "./models/like";
dotenv.config();
 const app = express();

export { app };



mongoose.connect(process.env.MONGOURI as string).then(() => {
   
}).catch(err => console.log(err));

app.use(cors())
app.use('/api-docs', docRouter);
app.use(express.json())
app.use(express.urlencoded({ extended: false}))


app.get("/", (req: Request, res: Response) => {
    res.status(200).json({
        status: "success",
        message: "welcome to My Brand Backend"
    })
})

app.use("/api/v1/blogs", blogRouter);
app.use("/api/v1/blogs", commentRouter)
app.use("/api/v1/users", userRouter)
app.use("/api/v1", QueriesRouter)
app.use("/api/v1/blogs", LikeRouter)



app.use("/*", (req: Request, res: Response) => {
    res.status(404).json({
        status: "error",
        message: "Invalid url"
    })
})

if (require.main === module)
{
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
} 
