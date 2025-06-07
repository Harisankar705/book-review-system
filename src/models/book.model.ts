import mongoose, { Schema } from "mongoose";
import { IBook } from "../interfaces/dbInterface";

const bookSchema:Schema=new Schema<IBook>({
    title:{type:String,required:true},
    author:{type:String,required:true},
    description:{type:String},
    publishedYear:{type:Number},
    genre:{type:String},
    pages:{type:Number}
},{timestamps:true})
export const Book=mongoose.model<IBook>('Book',bookSchema)