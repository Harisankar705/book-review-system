import { Router } from 'express';
import { ReviewService } from '../services/reviewService';
import { ReviewRepository } from '../repositories/reviewRepository';
import { ReviewController } from '../controller/reviewController'
import { verifyToken } from '../middleware/authMiddleware';
const reviewRouter = Router();
const reviewRepo = new ReviewRepository();
const reviewService = new ReviewService(reviewRepo);
const reviewController = new ReviewController(reviewService);
reviewRouter.post('/:bookId', verifyToken, reviewController.createReview.bind(reviewController));
reviewRouter.put('/:id', verifyToken, reviewController.updateReview.bind(reviewController));
reviewRouter.delete('/:id', verifyToken, reviewController.deleteReview.bind(reviewController));
export default reviewRouter;
