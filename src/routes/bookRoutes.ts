import { Router } from "express";
import { BookService } from "../services/bookService";
import { BookRepository } from "../repositories/bookRepository";
import { BookController } from "src/controller/bookController";
import { verifyToken } from "src/middleware/authMiddleware";

const bookRepository = new BookRepository();
const bookService = new BookService(bookRepository);
const bookController = new BookController(bookService);

const bookRouter = Router();

bookRouter.post("/",verifyToken, bookController.createBook.bind(bookController));
bookRouter.get("/", verifyToken,bookController.getBooks.bind(bookController));
bookRouter.get("/:id",verifyToken, bookController.getBook.bind(bookController));

export default bookRouter;
