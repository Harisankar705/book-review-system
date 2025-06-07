import { NextFunction, Request, Response } from "express";
import { STATUS_CODES } from "../utils/statusCode";
import { IReviewService } from "src/interfaces/service.interface";
export interface IReviewController{
    createReview(req:Request,res:Response,next:NextFunction):Promise<void>
    updateReview(req:Request,res:Response,next:NextFunction):Promise<void>
    deleteReview(req:Request,res:Response,next:NextFunction):Promise<void>
    
}
export class ReviewController implements IReviewController
{
    constructor(private reviewService:IReviewService){}
    async createReview(req:Request,res:Response,next:NextFunction)
    {
        try {
            const userId=req.user?.id 
            if(!userId)
                {
                    throw new Error("Login again!")
                } 
            const bookId=req.params.id
            const {rating,comment}=req.body
            if(!bookId||!rating)
            {
                throw new Error("Failed to add review.Try again!")
            }
            const reviewData={
                userId,
                bookId,
                rating,
                comment
            }
            const data=await this.reviewService.createReview(reviewData)
            res.status(STATUS_CODES.CREATED).json({success:true,data})
        } catch (error) {
            next(error)
        }
    }
    async updateReview(req:Request,res:Response,next:NextFunction)
    {
        try {
            const userId=req.user?.id 
            if(!userId)
                {
                    throw new Error("Login again!")
                } 
            const reviewId=req.params.id
            const {rating,comment}=req.body
            if(!reviewId||!rating)
            {
                throw new Error("Failed to add review.Try again!")
            }
            const reviewData={rating,comment}
            const data=await this.reviewService.updateReview(userId,reviewId,reviewData)
            res.status(STATUS_CODES.OK).json({success:true,data})
        } catch (error) {
            next(error)
        }
    }
    async deleteReview(req:Request,res:Response,next:NextFunction)
    {
        try {
            const userId=req.user?.id
            if(!userId)
                {
                    throw new Error("Login again!")
                } 
            const bookId=req.params.id
              if(!bookId)
            {
                throw new Error("Failed to add review.Try again!")
            }
            await this.reviewService.deleteReview(userId,bookId)
            res.status(STATUS_CODES.OK).json({success:true})

        } catch (error) {
            next(error)
        }
    }
}