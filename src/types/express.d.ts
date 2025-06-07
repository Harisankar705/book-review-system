import { IUser } from "../../interfaces/dbInterface"; 
declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}
