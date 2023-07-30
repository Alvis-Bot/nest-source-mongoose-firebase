import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User, UserDocument } from "../common/schemas/user.schema";
import { Model } from "mongoose";
import { UserCreateDto } from "./dto/user-create.dto";
import { Pagination } from "../common/pagination/pagination.dto";
import { Meta } from "../common/pagination/meta.dto";
import { PaginationModel } from "../common/pagination/pagination.model";
import { JwtPayload, MongoIdResponse } from "../common/type";

@Injectable()
export class UsersService {

  constructor(
    @InjectModel(User.name) private userModel: Model<User>
  ) {
  }

  async existsByPhone(phone: string): Promise<MongoIdResponse> {
    return this.userModel.exists({ phone });
  }

  async findOneByPhone(phone: string): Promise<UserDocument> {
    return this.userModel.findOne({ phone }).exec();
  }


  async create(dto: UserCreateDto) {
    return this.userModel.create(dto);
  }

  async createBaseUser(payload: JwtPayload): Promise<UserDocument> {
    console.log(payload);
    return this.userModel.create({
      phone: payload.phone
    });
  }

  async getUsers(pagination: Pagination): Promise<PaginationModel<User>> {
    const queryBuilder = this.userModel
      .find({
        // filter
      })
      .getQuery();
    const itemCount = await this.userModel.countDocuments(queryBuilder);
    const entities = await this.userModel.find()
      .skip(pagination.skip)
      .limit(pagination.take)
      .sort({
        createdAt: pagination.sort
      })
      .exec();
    const meta = new Meta({ itemCount, pagination });
    return new PaginationModel(entities, meta);
  }


  /*
  * @since: 7/29/2023 4:35 PM
  * @description:  Cập nhật fcmToken cho user
  * @update:
  * */
  async updateFcmToken(isUserExist: MongoIdResponse, fcmToken: string) {
    return await this.userModel.findOneAndUpdate(isUserExist, {
      $addToSet: { fcmToken: fcmToken }
    }, { new: true }).exec();
  }
}
