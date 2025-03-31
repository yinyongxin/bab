import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import {
  AdmintorsCreateBodyDto,
  AdmintorsFilterDto,
  AdmintorsUpdateDto,
} from './dto';
import { Admintors } from '../../../mongo/base';
import { toFuzzyParams } from '../../../mongo/tools';
import { PaginationDto } from '../../../dtos';
import { deleteByIds } from '../../../mongo/tools';

@Injectable()
export class AdmintorsService {
  constructor(
    @InjectModel(Admintors.name) private userModel: Model<Admintors>,
  ) {}

  async addOne(data: AdmintorsCreateBodyDto) {
    const session = await this.userModel.startSession();
    try {
      session.startTransaction();
      const createdAdmintor = new this.userModel(data);
      const res = await createdAdmintor.save({
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

  async findOneByAdmintorname(username: string) {
    return this.userModel.findOne({ username });
  }

  async deleteByIds(idsToUpdate: ObjectId[]) {
    const res = await deleteByIds(this.userModel, idsToUpdate);
    return res;
  }

  async findAllByFilter(data: AdmintorsFilterDto) {
    const res = await this.userModel.find(toFuzzyParams(data), {
      password: false,
    });
    return res;
  }

  async updateOne(id: string, data: AdmintorsUpdateDto) {
    const res = await this.userModel
      .updateOne(
        { _id: id },
        {
          ...data,
          // 更新updatedTime为当前时间
          $currentDate: {
            updatedTime: true,
          },
        },
      )
      .exec();
    return res;
  }

  async getPageList(pagination: PaginationDto, filter: AdmintorsFilterDto) {
    const [res] = await this.userModel.aggregate([
      { $match: toFuzzyParams(filter) },
      { $sort: { createdTime: -1 } },
      {
        $facet: {
          metadata: [{ $count: 'total' }],
          list: [
            { $skip: pagination.pageSize * (pagination.pageNo - 1) },
            { $limit: pagination.pageSize },
            {
              $project: {
                password: 0, // 在这里处理密码的隐藏
              },
            },
          ],
        },
      },
      // 使用 $addFields 来构建返回结构
      {
        $project: {
          total: { $arrayElemAt: ['$metadata.total', 0] }, // 直接取出 total
          list: 1,
        },
      },
    ]);
    return {
      ...(res || {
        list: [],
        total: 0,
      }),
      ...pagination,
    };
  }
}
