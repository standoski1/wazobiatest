import mongoose, { Document } from "mongoose";


const PostSchema = new mongoose.Schema({
    title: { 
        type: String
        },
    text: { 
        type: String
        },
    
}, {timestamps: true})

interface IPost extends Document{
    title: string,
    text: string,
}

export default mongoose.models.Post || mongoose.model<IPost>('Post', PostSchema)
