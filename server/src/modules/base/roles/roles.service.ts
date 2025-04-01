import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { RoleCreateBodyDto, RolesQueryFilterDto, RolesUpdateDto } from './dto';
import { Roles } from '../../../mongo/base';
import { toFuzzyParams } from '../../../mongo/tools';
import { PaginationDto } from '../../../dtos';
import { deleteByIds } from '../../../mongo/tools';

@Injectable()
export class RolesService {
  constructor(@InjectModel(Roles.name) private userModel: Model<Roles>) {}

  async addOne(data: RoleCreateBodyDto) {
    const session = await this.userModel.startSession();
    try {
      session.startTransaction();
      const createdRole = new this.userModel(data);
      const res = await createdRole.save({
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

  async deleteByIds(ids: string[]) {
    const res = await deleteByIds(this.userModel, ids as unknown as ObjectId[]);
    return res;
  }

  async updateOne(id: string, data: RolesUpdateDto) {
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

  async getPageList(pagination: PaginationDto, filter: RolesQueryFilterDto) {
    // 构建聚合管道
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

    // 如果结果为空，处理为空的情况
    // 确保返回的结果格式，如 { total: 0, list: [], ...pagination }
    return {
      total: res ? res.total || 0 : 0, // 确保总数为0
      list: res ? res.list : [], // 确保列表为空
      pageNo: pagination.pageNo, // 返回当前页码
      pageSize: pagination.pageSize, // 返回每页大小
    };
  }

  getAll(filter: RolesQueryFilterDto) {
    return this.userModel.find(filter, {});
  }
}
