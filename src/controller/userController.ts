import { NextFunction, Request, Response } from "express";
import { IUserService } from "../services/userService";
import { STATUS_CODES } from "../utils/statusCode";
import { IUserController } from "../interfaces/controllerInterfaces";
export class UserController implements IUserController {
  constructor(private userService: IUserService) {}
  async register(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { email, username, password } = req.body;

    if (!email || !username || !password) {
      res.status(STATUS_CODES.BAD_REQUEST).json({ success: false, message: "Please provide email, username, and password." });
      return;
    }

    const data = await this.userService.register(req.body);
    if (!data) {
   res.status(STATUS_CODES.BAD_REQUEST).json({ success: false, message: "User registration failed" });
   return
    }
    const { password: pwd, ...userWithoutPassword } = data;

    res.status(STATUS_CODES.CREATED).json({ success: true, data: userWithoutPassword });
  } catch (error) {
    next(error);
  }
}
  async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        res.status(STATUS_CODES.BAD_REQUEST).json({ success: false, message: "Please provide email and password." });
        return;
      }
      const data = await this.userService.login(req.body);
      const { password: pwd, ...userWithoutPassword } = data.user;
      res.status(STATUS_CODES.OK).json({ success: true, data: { user: userWithoutPassword, token: data.token } });
    } catch (error) {
      next(error);
    }
  }
}
