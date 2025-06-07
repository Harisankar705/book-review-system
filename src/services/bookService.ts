import { IBook } from "../interfaces/dbInterface";
import { IBookService } from "../interfaces/service.interface";
import { IBookRepository } from "../repositories/bookRepository";
export class BookService implements IBookService{
    constructor(private bookRepository:IBookRepository){}
    async createBook(data:IBook):Promise<IBook>
    {
        return await this.bookRepository.create(data)
    }
    async getBooks(filters:Partial<IBook>,page:number,limit:number):Promise<{data:IBook[],total:number}>
    {
        return await this.bookRepository.findBooksWithFilters(filters,page,limit)
    }
    async getBookDetails(id:string):Promise<IBook|null>
    {
        return await this.bookRepository.getBookDetails(id)
    }
    async getAverageRating(bookId:string):Promise<number>
    {
        return await this.bookRepository.getAverageRating(bookId)
    }

}