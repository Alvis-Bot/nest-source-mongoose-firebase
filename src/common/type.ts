import { Types } from "mongoose";

export type JwtPayload = {
  phone: string;
  uid: string;
  provider: string;
}

export type MongoIdResponse = {
  _id: Types.ObjectId;
}