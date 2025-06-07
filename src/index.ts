import express, { Application, Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { STATUS_CODES } from './utils/statusCode';


dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// API routes
app.use('//users', userRoutes);
app.use('/books', bookRoutes);
app.use('/api/reviews', reviewRoutes);

// Root route
app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to the Job Portal API');
});

// Global error handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
    success: false,
    message: err.message || 'Something went wrong',
  });
});

// MongoDB connection and server start
mongoose
  .connect(process.env.MONGO_URI as string)
  .then(() => {
    console.log('✅ MongoDB connected');
    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('❌ MongoDB connection error:', error);
  });
