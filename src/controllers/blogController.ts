import Blog from "../models/blog";
import { Request, Response } from "express";
import uploadFile from "../helpers/cloud";
import { Blog_structure} from "../models/blog";

const createBlog = async (req: Request, res: Response) => {
    let file : any  = req.file;
    try{
        const result = await uploadFile(req.file, res);
        const newBlog = await Blog.create({
            title: req.body.title,
            description: req.body.description,
            image: result
        });
        res.status(200).json({
            status: "success",
            message: "blog was created successfully!",
            data: newBlog
        })
    } catch(err: any){
        res.status(400).json({
            status: "error",
            error: err.message
        })
    }
}


const getBlogs = async (req: Request, res: Response) => {
    try{
        const blogs = await Blog.find();
        res.status(200).json({
            status: "success",
            data: blogs
        });
    } catch(err: any){
        res.status(400).json({
            status: "error",
            error: err.message
        })
    }
}

const getBlogById = async (req: Request, res: Response) => {
    try{
        const blog = await Blog.findById(req.params.id);
        if(!blog){
            return res.status(404).json({
                status: "error",
                message: "blog was not found"
            })
        }
        return res.status(200).json({
            status: "success",
            data: blog
        })
    } catch(error: any){
        res.status(400).json({
            status: "error",
            message: error.message
        })
    }
}

const deleteBlog = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
      const blog = await Blog.findByIdAndDelete(id);
      if (!blog) {
        return res.status(404).json({
          status: "failed",
          message: "blog was not found",
        });
      }
      return res.status(204).json({
        status: "success",
        message: "blog deleted successfully",
      });
    } catch (error) {
      return res.status(400).json({
        status: "failed",
        error,
      });
    }
  };

const updateBlog = async (req: Request, res: Response) => {
    try {
        const blog: any = await Blog.findById(req.params.id)
        if(!blog){
            res.status(404).json({
                status: "error",
                message: "blog was not found"
            });
        }
        if (req.body.title) {
            blog.title = req.body.title
        }

        if (req.body.description) {
            blog.description = req.body.description
        }
        if(req.file){
            const result = await uploadFile(req.file, res);
            blog.image = result;
        }

        await blog.save()
        res.status(200).json({
            status: "success",
            message: "blog was updated successfully!",
            blog
        })
    } catch(error: any) {
        res.status(400).json({
            status: "error",
            message: error.message
        })
    }
}

export {
    createBlog,
    getBlogs,
    getBlogById,
    updateBlog,
    deleteBlog
}