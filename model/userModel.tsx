import mongoose, { Document } from "mongoose";
import bcrypt from "bcryptjs"


const UserSchema = new mongoose.Schema({
    password: { 
        type: String,
        required: true
        },
    username: { 
        type: String,
        required: true,
        },
    email: { 
        type: String,
        required: true,
        },
    
}, {timestamps: true})

UserSchema.pre("save", async function (next) {
    if (!this.isModified('password')) {
      next();
    }
  
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  });

interface IUser extends Document{
    password: string,
    username: string,
    email: string,
}

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema)
