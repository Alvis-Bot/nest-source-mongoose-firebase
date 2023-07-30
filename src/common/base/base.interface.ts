import { FilterQuery, HydratedDocument, MergeType } from "mongoose";
import { DeleteResult } from "mongodb";


export interface IBaseRepository<T> {
  create(data: T): Promise<T>;

  countDocuments(conditions?: FilterQuery<T>): Promise<number>;

  findByIdAndUpdate(id: string, data: T): Promise<T>;

  findByIdAndDelete(id: string): Promise<T>;

  deleteMany(conditions?: FilterQuery<T>): Promise<DeleteResult>;

  insertMany(data: T[]): Promise<Array<MergeType<HydratedDocument<T, {}, {}>, Omit<T, "_id">>>>;

  deleteOne(conditions?: FilterQuery<T>): Promise<DeleteResult>;
}