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
      const createdAdmintor = new this.userModel({
        ...data,
      });
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

  findOneByFilter(filter: { username?: string; email?: string }) {
    console.log(filter, 'filter');
    const filterRes = Object.fromEntries(
      Object.entries(filter).filter(([, value]) => value !== undefined),
    );
    return this.userModel.findOne(filterRes);
  }

  async deleteByIds(idsToUpdate: ObjectId[]) {
    const res = await deleteByIds(this.userModel, idsToUpdate);
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
              $lookup: {
                from: 'roles', // 目标集合名称（MongoDB 中小写复数）
                localField: 'roles', // 当前集合中的字段（用户集合中的 roles）
                foreignField: '_id', // 目标集合中的字段（角色集合中的 ID）
                as: 'roles', // 输出到的字段名
              },
            },
            {
              $project: {
                password: 0, // 隐藏密码字段
              },
            },
          ],
        },
      },
      // 最终结果的构建
      {
        $project: {
          total: { $arrayElemAt: ['$metadata.total', 0] }, // 直接取出 total
          list: '$list', // 返回 list
        },
      },
    ]);

    // 检查结果以确保处理
    if (!res) {
      return { total: 0, list: [] };
    }

    return {
      ...(res || {
        list: [],
        total: 0,
      }),
      ...pagination,
    };
  }
}
