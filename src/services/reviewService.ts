import mongoose from 'mongoose';
import { IReview } from '../interfaces/dbInterface';
import { IReviewRepository } from '../repositories/reviewRepository';
import { IReviewService } from 'src/interfaces/service.interface';

export class ReviewService implements IReviewService{
    constructor(private reviewRepository:IReviewRepository){}
   async createReview(data: Partial<IReview>): Promise<IReview | null> {
    const userId = data.user;
    const bookId = data.book;

    if (!userId || !bookId) {
        throw new Error("Missing userId or bookId");
    }

    const userObjectId = new mongoose.Types.ObjectId(userId);
    const bookObjectId = new mongoose.Types.ObjectId(bookId);

    const alreadyReviewed = await this.reviewRepository.hasUserReviewedBook(userObjectId, bookObjectId);
    if (alreadyReviewed) {
        throw new Error("You have already reviewed this book!");
    }

    return this.reviewRepository.createReview({
        ...data,
        user: userObjectId,
        book: bookObjectId,
    } as IReview);
}
    async updateReview(reviewId:string,userId:string,data:Partial<IReview>)
    {
        return await this.reviewRepository.updateReview(reviewId,userId,data)
    }
    async deleteReview(reviewId:string,userId:string):Promise<boolean>
    {
        return await this.reviewRepository.deleteReview(reviewId,userId)
    }
    async getReviewByBook(bookId:string,page:number,limit:number)
    {
        return await this.reviewRepository.getReviewsByBook(bookId,page,limit)
    }
    
}