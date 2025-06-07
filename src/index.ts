import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';
import rateLimit from 'express-rate-limit'; 
import userRouter from './routes/userRoutes';
import bookRouter from './routes/bookRoutes';
import reviewRouter from './routes/reviewRoutes';
import { errorHandler } from './middleware/errorHandler';
dotenv.config();
const app = express();
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 100, 
  message: {
    success: false,
    message: 'Too many requests from this IP, please try again later.',
  },
});
app.use(limiter); 
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use('/api/users', userRouter);
app.use('/api/books', bookRouter);
app.use('/api/reviews', reviewRouter);
app.use(errorHandler);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
