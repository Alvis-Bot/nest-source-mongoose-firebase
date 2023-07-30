import { FilterQuery, HydratedDocument, MergeType, Model, Promise } from "mongoose";
import { IBaseRepository } from "./base.interface";
import { DeleteResult } from "mongodb";


export abstract class BaseRepository<T> implements IBaseRepository<T> {

  protected constructor(protected readonly model: Model<T>) {
  }

  async create(data: T): Promise<T> {
    return this.model.create(data);
  }

  countDocuments(conditions?: FilterQuery<T>): Promise<number> {
    return this.model.countDocuments(conditions);
  }

  deleteMany(conditions?: FilterQuery<T>): Promise<DeleteResult> {
    return this.model.deleteMany(conditions);
  }

  deleteOne(conditions?: FilterQuery<T>): Promise<DeleteResult> {
    return this.model.deleteOne(conditions);
  }

  findByIdAndDelete(id: string): Promise<T> {
    return this.model.findByIdAndDelete(id);
  }

  findByIdAndUpdate(id: string, data: T): Promise<T> {
    return this.model.findByIdAndUpdate(id, data);
  }

  insertMany(data: T[]): Promise<Array<MergeType<HydratedDocument<T, {}, {}>, Omit<T, "_id">>>> {
    return this.model.insertMany(data);
  }

}
