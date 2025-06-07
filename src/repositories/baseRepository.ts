import { Document, FilterQuery, Model, UpdateQuery } from "mongoose";

export class BaseRepository<T extends Document> {
    constructor(protected readonly model: Model<T>) { }
    async create(data: Partial<T>): Promise<T> {
        const entity = new this.model(data);
        return await entity.save();
    }
    async findById(id: string): Promise<T | null> {
        return await this.model.findById(id).exec();
    }
    async findOne(filter: FilterQuery<T>): Promise<T | null> {
        return await this.model.findOne(filter).exec();
    }
    async findAll(
        filter: FilterQuery<T> = {},
        limit: 10,
        skip = 0
    ): Promise<T[]> {
        return await this.model.find(filter).limit(limit).skip(skip).exec();
    }
    async update(id: string, update: UpdateQuery<T>): Promise<T | null> {
        return await this.model.findByIdAndUpdate(id, update, { new: true }).exec();
    }
    async delete(id: string): Promise<boolean> {
        const result = await this.model.findByIdAndDelete(id).exec();
        return result !== null;
    }
}
