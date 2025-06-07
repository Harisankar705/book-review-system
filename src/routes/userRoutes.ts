import { Router } from "express";
import { UserService } from "../services/userService";
import { UserRepository } from "../repositories/userRepository";
import { UserController } from "src/controller/userController";

const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const userController = new UserController(userService);

const userRouter = Router();

userRouter.post("/register", userController.register.bind(userController));
userRouter.post("/login", userController.login.bind(userController));

export default userRouter;
