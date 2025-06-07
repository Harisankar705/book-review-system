import mongoose, { Schema } from "mongoose";
import { IUser } from "../interfaces/dbInterface";

const userSchema:Schema=new Schema<IUser>({
    username:{type:String,required:true,unique:true,trim:true},
    password:{type:String,required:true},
    email:{type:String,required:true}
})
export const User=mongoose.model<IUser>("User",userSchema)