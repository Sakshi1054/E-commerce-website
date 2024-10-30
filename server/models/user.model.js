import mongoose, { Schema } from "mongoose"

const userSchema = new Schema(
    {
        userName: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            // searchable ....seach enable hai to index true kr dena ...* optimization
            index: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        password:{
            type: String,
            // true filled ke sath me custom msg de skte hai
            required: [true, 'Password is required']
        },
        role : {
            type: String,
            default : "user"
        }
    },
    {
        timestamps: true
    }
);

export const User = mongoose.model("User", userSchema)