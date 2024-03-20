import mongoose from "mongoose";

export interface Blog_structure {
    title: string;
    description: string;
    image?: string;
}


const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: false
    },

    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }]
});

const Blog = mongoose.model("Blog", blogSchema);

export default Blog;