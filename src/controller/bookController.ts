import { NextFunction, Request, Response } from "express";
import { IBookService } from "../interfaces/service.interface";
import { STATUS_CODES } from "../utils/statusCode";
export interface IBookController{
    createBook(req: Request, res: Response, next: NextFunction):Promise<void>
    getBooks(req: Request, res: Response, next: NextFunction):Promise<void>
    getBook(req: Request, res: Response, next: NextFunction):Promise<void>
}
export class BookController implements IBookController{
  constructor(private bookService: IBookService) {}
  async createBook(req: Request, res: Response, next: NextFunction):Promise<void> {
    try {
      const userId = req.user?.id; 
      if (!userId) {
        throw new Error("Unauthorized! Please login!");
      }
      const data = req.body;
      if (!data.title || !data.author) {
        throw new Error("Book title and author are required!");
      }
      
      const result = await this.bookService.createBook({ ...data, createdBy: userId });
      res.status(STATUS_CODES.CREATED).json({ success: true, result });
    } catch (error) {
      next(error);
    }
  }
  async searchBooks(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const query = req.query.q as string;
    if (!query) {
      res.status(400).json({ success: false, message: "Query parameter 'q' is required" });
      return;
    }
    const results = await this.bookService.searchBooks(query);
    res.status(200).json({ success: true, data: results });
  } catch (error) {
    next(error);
  }
  }
  async getBooks(req: Request, res: Response, next: NextFunction):Promise<void> {
    try {
      
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const filters = req.query; 
      const result = await this.bookService.getBooks(filters, page, limit);
      res.status(STATUS_CODES.OK).json({ success: true, ...result });
    } catch (error) {
      next(error);
    }
  }
  async getBook(req: Request, res: Response, next: NextFunction):Promise<void> {
    try {
      const bookId = req.params.id;
      if (!bookId) {
        throw new Error("Book ID is required.");
      }
      const book = await this.bookService.getBookDetails(bookId);
      res.status(STATUS_CODES.OK).json({ success: true, book });
    } catch (error) {
      next(error);
    }
  }
}
