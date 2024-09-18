import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserBodyDto, QueryUserDto, UpdateUserDto } from './dtos';
import { UserDocument } from '../../../schemas/user/index.';
import { toFuzzyParams } from '../../../utils/db/find';
import { PaginationDto } from '../../../dto';
import dayjs from 'dayjs';
import { omit } from 'radash';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(UserDocument.name) private userModel: Model<UserDocument>,
  ) {}

  async addOne(data: CreateUserBodyDto) {
    const session = await this.userModel.startSession();
    try {
      session.startTransaction();
      const createdUser = new this.userModel(data);
      const res = await createdUser.save({
        session,
      });
      await session.commitTransaction();
      return res;
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }
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
        deletedTime: dayjs(),
      },
    );
    return res;
  }

  async findAllByFields(data: QueryUserDto) {
    const res = await this.userModel.find(toFuzzyParams(data), {
      password: false,
    });
    return res;
  }

  async updateOne(id: string, data: UpdateUserDto) {
    const res = await this.userModel.findByIdAndUpdate(id, {
      ...data,
      updatedTime: dayjs(),
    });
    return res;
  }

  async getPageList(pagination: PaginationDto, data: UpdateUserDto) {
    const [res] = await this.userModel.aggregate([
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
    ]);
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
