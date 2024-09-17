import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserBodyDto, QueryUserDto, UpdateUserDto } from './dtos';
import { User } from 'src/schemas/user/index.';
import { toFuzzyParams } from 'src/utils/db/find';
import { PaginationDto } from 'src/dto';
import dayjs from 'dayjs';
import { list, omit } from 'radash';
import { FORMAT } from 'src/config/dayjs';

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
    const res = this.userModel
      .findById(id, {
        password: false,
      })
      .exec();
    return res;
  }
  async deleteByIds(idsToUpdate: string[]) {
    const res = await this.userModel
      .updateMany(
        { _id: { $in: idsToUpdate } },
        {
          deletedTime: new Date(),
        },
      )
      .exec();
    return res;
  }

  async findAllByFields(data: QueryUserDto) {
    const res = await this.userModel
      .find(toFuzzyParams(data), {
        password: false,
      })
      .exec();
    return res;
  }

  async updateOne(id: string, data: UpdateUserDto) {
    const res = await this.userModel
      .findByIdAndUpdate(id, { ...data, updatedTime: dayjs() })
      .exec();
    return res;
  }

  async getPageList(pagination: PaginationDto, data: UpdateUserDto) {
    const [res] = await this.userModel
      .aggregate([
        {
          $sort: {
            createdTime: -1,
          },
        },
        {
          $match: toFuzzyParams(data),
        },
        {
          $group: {
            _id: null,
            total: { $sum: 1 },
            list: {
              $push: {
                data: '$$ROOT',
                dateData: {
                  createdTime: {
                    $dateToString: {
                      format: '%Y-%m-%d %H:%M:%S',
                      date: '$createdTime',
                    },
                  },
                  updatedTime: {
                    $dateToString: {
                      format: '%Y-%m-%d %H:%M:%S',
                      date: '$updatedTime',
                    },
                  },
                  deletedTime: {
                    $dateToString: {
                      format: '%Y-%m-%d %H:%M:%S',
                      date: '$deletedTime',
                    },
                  },
                },
              },
            },
          },
        },
        {
          $project: {
            _id: 0,
            total: '$total',
            list: {
              $slice: [
                '$list',
                pagination.pageSize * (pagination.pageNo - 1),
                pagination.pageSize,
              ],
            },
          },
        },
      ])
      .exec();
    return {
      list:
        res?.list.map((item) =>
          omit({ ...item.data, ...item.dateData }, ['password']),
        ) || [],
      total: res?.total ?? 0,
      ...pagination,
    };
  }
}
