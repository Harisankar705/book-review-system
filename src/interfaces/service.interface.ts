import { IBook, IReview } from "./dbInterface"

export interface IBookService{
    createBook(data:IBook):Promise<IBook>
    getBooks(filter:Partial<IBook>,page:number,limit:number):Promise<{data:IBook[],total:number}>
    getBookDetails(id:string):Promise<IBook|null>
    getAverageRating(bookId:string):Promise<number>
}
export interface IReviewService{
    createReview(data:Partial<IReview>):Promise<IReview|null>
    updateReview(reviewId:string,userId:string,data:Partial<IReview>):Promise<IReview|null>
    deleteReview(reviewId:string,userId:string):Promise<boolean>
    getReviewByBook(bookId: string, page: number, limit: number): Promise<{ data: IReview[]; total: number }>;


}