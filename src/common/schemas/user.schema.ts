import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

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
    type: [String],
    default: []
  })
  fcmToken: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);