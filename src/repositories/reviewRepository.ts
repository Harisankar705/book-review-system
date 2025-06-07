import { IReview } from "../interfaces/dbInterface";
import { Review } from "../models/review.model";
import { BaseRepository } from "./baseRepository";
import mongoose, { Types } from "mongoose";

export interface IReviewRepository {
  createReview(data: Partial<IReview>): Promise<IReview | null>;
  updateReview(reviewId: string, data: Partial<IReview>): Promise<IReview | null>;
  deleteReview(reviewId: string,userId:string): Promise<boolean>;
  hasUserReviewedBook(userId: Types.ObjectId, bookId: Types.ObjectId): Promise<boolean>;
  getReviewsByBook(bookId: string, page: number, limit: number): Promise<{ data: IReview[]; total: number }>;
  getAverageRating(bookId: string): Promise<number>;
}

export class ReviewRepository extends BaseRepository<IReview> implements IReviewRepository {
  constructor() {
    super(Review);
  }

  async createReview(data: Partial<IReview>): Promise<IReview | null> {
    return await this.create(data as IReview);
  }

  async updateReview(reviewId: string, data: Partial<IReview>): Promise<IReview | null> {
    return await this.update(reviewId, data);
  }

  async deleteReview(reviewId: string, userId: string): Promise<boolean> {
  const review = await this.model.findById(reviewId);
  if (!review) {
    throw new Error("Review not found");
  }
  if (review.user.toString() !== userId) {
    throw new Error("Unauthorized: You can only delete your own reviews");
  }
  await this.delete(reviewId);
  return true;
  }

  async hasUserReviewedBook(userId: Types.ObjectId, bookId: Types.ObjectId): Promise<boolean> {
    const review = await this.model.findOne({ user: userId, book: bookId });
    return !!review;
  }

  async getReviewsByBook(bookId: string, page: number = 1, limit: number = 10): Promise<{ data: IReview[]; total: number }> {
    const objectId = new mongoose.Types.ObjectId(bookId);
    const skip = (page - 1) * limit;

    const total = await this.model.countDocuments({ book: objectId });

    const data = await this.model
      .find({ book: objectId })
      .populate("user", "username email")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    return { data, total };
  }

  async getAverageRating(bookId: string): Promise<number> {
    const objectId = new mongoose.Types.ObjectId(bookId);
    const result = await this.model.aggregate([
      { $match: { book: objectId } },
      {
        $group: {
          _id: "$book",
          avgRating: { $avg: "$rating" },
        },
      },
    ]);
    return result[0]?.avgRating ?? 0;
  }
}
