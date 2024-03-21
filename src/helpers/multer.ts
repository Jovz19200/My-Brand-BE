
import multer from "multer";
import path from "path";

const storage = multer.diskStorage({});

const fileFilter = (req: Express.Request, file: Express.Multer.File, cb: multer.FileFilterCallback): void => {
  const ext: string = path.extname(file.originalname).toLowerCase();

  if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") {
    cb(new Error("File type is not supported"));
    return;
  }
  cb(null, true);
}
 const  upload = multer({storage, fileFilter})
  
 export default  upload;


  // Path: src/helpers/multer.ts

  