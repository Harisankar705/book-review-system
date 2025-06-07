import mongoose, { Document } from "mongoose"

export interface IBook extends Document
{
    title:string,
    author:string,
    description?:string,
    publishedYear?:number,
    genre?:string,
    pages:number

}
export interface IUser extends Document{
    _id:string|undefined
    username:string
    password:string,
    email:string
}
export interface IReview extends Document{
    user:mongoose.Types.ObjectId,
    book:mongoose.Types.ObjectId,
    rating:number,
    comment?:string
}
export interface CustomError extends Error
{
    status?:number
}
export interface JwtPayload {
  id: string;
  email: string;
  iat?: number;
  exp?: number;
}
export interface IUserInput {
  email: string;
  username: string;
  password: string;
}