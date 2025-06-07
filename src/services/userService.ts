import bcrypt from "bcryptjs";
import { IUser, IUserInput } from "../interfaces/dbInterface";
import { IUserRepository } from "../repositories/userRepository";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
export interface IUserService {
    register(data: IUserInput): Promise<IUser | null>;
    login(data: { email: string; password: string }): Promise<{ user: IUser; token: string | null }>;
}
export class UserService implements IUserService {
    constructor(private userRepository: IUserRepository) { }
    async register(data: IUserInput): Promise<IUser | null> {
        const { email, username, password } = data;
        const alreadyExists = await this.userRepository.isEmailOrUsernameTaken(email, username);
        if (alreadyExists) {
            throw new Error("Email or username already taken!");
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const userData: IUserInput = {
        email: data.email!,
        username: data.username!,
        password: hashedPassword,
        };
        return await this.userRepository.createUser(userData);
    }
    async login(data: { email: string; password: string }): Promise<{ user: IUser; token: string | null }> {
        const user = await this.userRepository.findByEmail(data.email);
        if (!user) {
            throw new Error("User not found!");
        }
        const isMatch = await bcrypt.compare(data.password, user.password);
        if (!isMatch) {
            throw new Error("Incorrect password!");
        }
        const token = jwt.sign(
            { id: user._id, email: user.email },
            process.env.JWT_SECRET!,
            { expiresIn: "1d" }
        );
        return { user, token };
    }
}
