import { IUser, IUserInput } from "../interfaces/dbInterface";
import { User } from "../models/user.model";
import { BaseRepository } from "./baseRepository";
export interface IUserRepository {
  findByEmail(email: string): Promise<IUser | null>
  isEmailOrUsernameTaken(email: string, username: string): Promise<boolean>
  createUser(data: IUserInput): Promise<IUser | null>
}
export class UserRepository extends BaseRepository<IUser> implements IUserRepository {
  constructor() {
    super(User);
  }

  async createUser(data: IUser): Promise<IUser | null> {
    return await this.create(data)
  }

  async findByEmail(email: string): Promise<IUser | null> {
    return this.model.findOne({ email });
  }


  async isEmailOrUsernameTaken(email: string, username: string): Promise<boolean> {
    const user = await this.model.findOne({
      $or: [{ email }, { username }],
    });
    return !!user;
  }
}
