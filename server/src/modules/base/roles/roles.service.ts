import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { CreateRoleBodyDto, QueryRoleDto, UpdateRoleDto } from './dto';
import { Roles } from '../../../mongo/base';
import { toFuzzyParams } from '../../../mongo/tools';
import { PaginationDto } from '../../../dtos';
import dayjs from 'dayjs';
import { omit } from 'radash';
import { deleteByIds } from '../../../mongo/tools';

@Injectable()
export class RolesService {
  constructor(@InjectModel(Roles.name) private userModel: Model<Roles>) {}

  async addOne(data: CreateRoleBodyDto) {
    const session = await this.userModel.startSession();
    try {
      session.startTransaction();
      const createdRole = new this.userModel(data);
      console.log('createdRole', createdRole);
      const res = await createdRole.save({
        session,
      });
      console.log('res', res);
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

  async findOneByRolename(username: string) {
    return this.userModel.findOne({ username });
  }

  async deleteByIds(idsToUpdate: ObjectId[]) {
    const res = await deleteByIds(this.userModel, idsToUpdate);
    return res;
  }

  async findAllByFields(data: QueryRoleDto) {
    const res = await this.userModel.find(toFuzzyParams(data), {
      password: false,
    });
    return res;
  }

  async updateOne(id: string, data: UpdateRoleDto) {
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

  async getPageList(pagination: PaginationDto, data: UpdateRoleDto) {
    const [res] = await this.userModel.aggregate([
      { $match: toFuzzyParams(data) },
      { $sort: { createdTime: -1 } },
      {
        $project: {
          password: 0,
        },
      },
      {
        $facet: {
          metadata: [{ $count: 'total' }],
          list: [
            { $skip: pagination.pageSize * (pagination.pageNo - 1) },
            { $limit: pagination.pageSize },
          ],
        },
      },
      { $unwind: '$metadata' },
      {
        $project: {
          total: '$metadata.total',
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
