import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { CreateUserBodyDto } from './dtos/CreateUserBodyDto';
import { User, UserDocument } from 'src/schemas/user/index.';
import { toFuzzyParams } from 'src/utils/db/find';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async addOne(data: CreateUserBodyDto) {
    // const session = await this.userModel.startSession();
    // try {
    //   session.startTransaction();
    //   const createdUser = new this.userModel(data);
    //   await createdUser.save({
    //     session,
    //   });
    //   const res = await session.commitTransaction();
    //   return res;
    // } catch (error) {
    //   await session.abortTransaction();
    //   throw error;
    // } finally {
    //   session.endSession();
    // }
    const createdUser = new this.userModel(data);
    const res = await createdUser.save();
    return res;
  }
  async findById(id: string) {
    const res = this.userModel.findById(id, {
      password: false,
    });
    return res;
  }
  async deleteByIds(idsToUpdate: string[]) {
    const res = await this.userModel.updateMany(
      { _id: { $in: idsToUpdate } },
      {
        deletedTime: new Date(),
      },
    );
    return res;
  }

  async findAllByFields(data: Omit<User, 'password'>) {
    const res = await this.userModel.find(toFuzzyParams(data), {
      password: false,
    });
    return res;
  }
}
