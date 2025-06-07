import { Router } from 'express';
import { UserService } from '../services/userService';
import { UserRepository } from '../repositories/userRepository';
import { UserController } from '../controller/userController';

const userRouter = Router();
const userRepo = new UserRepository();
const userService = new UserService(userRepo);
const userController = new UserController(userService);

userRouter.post('/signup', userController.register.bind(userController));
userRouter.post('/login', userController.login.bind(userController));

export default userRouter;
