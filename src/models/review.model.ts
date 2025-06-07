import mongoose, { Schema } from "mongoose";
import { IReview } from "../interfaces/dbInterface";

const reviewSchema:Schema=new Schema<IReview>({
    user:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true},
    book:{type:mongoose.Schema.Types.ObjectId,ref:"Book",required:true},
    rating:{type:Number,required:true,min:1,max:5},
    comment:{type:String}

},{timestamps:true})

export const Review=mongoose.model<IReview>('Review',reviewSchema)