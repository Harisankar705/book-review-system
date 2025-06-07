import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config()
export const dbConnection=async():Promise<void>=>{
    try {
        const mongoUri=process.env.MONGOURI
        if(!mongoUri)
        {
            throw new Error("MONGOURI environment variable is not defined")
        }
        await mongoose.connect(mongoUri)
        console.log("Successfully connected to mongodb!")
    } catch (error) {
        console.log('failed to connect to mongodb',error)
    }
}