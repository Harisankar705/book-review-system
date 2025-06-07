import { Router } from "express";
import { ReviewService } from "../services/reviewService";
import { ReviewRepository } from "../repositories/reviewRepository";
import { verifyToken } from "src/middleware/authMiddleware";
import { ReviewController } from "src/controller/reviewController";

const reviewRepository = new ReviewRepository();
const reviewService = new ReviewService(reviewRepository);
const reviewController = new ReviewController(reviewService);

const router = Router();

router.post("/:id/reviews", verifyToken, reviewController.createReview.bind(reviewController));
router.put("/:id/reviews", verifyToken, reviewController.updateReview.bind(reviewController));
router.delete("/:id/reviews", verifyToken, reviewController.deleteReview.bind(reviewController));

export default router;
