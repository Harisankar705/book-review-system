
import { IBook } from '../interfaces/dbInterface';
import { Book } from '../models/book.model';
import { BaseRepository } from './baseRepository';
import mongoose, { FilterQuery } from 'mongoose';
export interface IBookRepository {
  create(data: IBook): Promise<IBook>
  findBooksWithFilters(filters: Partial<IBook>, page: number, limit: number): Promise<{ data: IBook[], total: number }>
  getBookDetails(bookId: string): Promise<IBook | null>
  getAverageRating(bookId: string): Promise<number>
}
export class BookRepository extends BaseRepository<IBook> implements IBookRepository {
  constructor() {
    super(Book);
  }

  async findBooksWithFilters(
    filters: Partial<IBook>,
    page: number = 1,
    limit: number = 10
  ): Promise<{ data: IBook[]; total: number }> {
    const query: FilterQuery<IBook> = {};

    if (filters.author) query.author = { $regex: filters.author, $options: 'i' };
    if (filters.genre) query.genre = { $regex: filters.genre, $options: 'i' };

    const total = await this.model.countDocuments(query);
    const data = await this.model
      .find(query)
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 });

    return { data, total };
  }
  async getBookDetails(bookId: string): Promise<IBook | null> {
    return this.model.findById(bookId);
  }

  async getAverageRating(bookId: string): Promise<number> {
    const result = await Book.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(bookId) } },
      {
        $lookup: {
          from: 'reviews',
          localField: '_id',
          foreignField: 'book',
          as: 'reviews',
        },
      },
      {
        $unwind: '$reviews',
      },
      {
        $group: {
          _id: '$_id',
          averageRating: { $avg: '$reviews.rating' },
        },
      },
    ]);

    return result.length > 0 ? result[0].averageRating : 0;
  }
}
