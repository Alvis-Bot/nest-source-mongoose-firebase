import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { Role } from "../enum";

export type UserDocument = HydratedDocument<User>;


@Schema({
  timestamps: true
})
export class User {

  @Prop({
    required: false,
    default: null
  })
  fullName: string;

  @Prop({
    required: true,
    unique: true
  })
  phone: string;

  @Prop({
    required: true,
    enum : Role,
    default: Role.USER
  })
  role: number

  @Prop({
    required: false,
    default: null
  })
  avatar: string;

  @Prop({
    required: true,
    type: [String],
    default: []
  })
  fcmToken: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);