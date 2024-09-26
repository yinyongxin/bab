import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId, Types } from 'mongoose';
import { CreateMenuBodyDto, QueryMenuDto, UpdateMenuDto } from './dto';
import { Menus } from '../../../mongo/base';
import { toFuzzyParams } from '../../../mongo/tools';
import { PaginationDto } from '../../../dtos';
import dayjs from 'dayjs';
import { omit } from 'radash';
import { deleteByIds } from '../../../mongo/tools';

@Injectable()
export class MenusService {
  constructor(@InjectModel(Menus.name) private menusModel: Model<Menus>) {}

  async addOne(data: CreateMenuBodyDto) {
    const createdMenu = new this.menusModel(data);
    const res = await createdMenu.save();
    return res;
  }

  async findById(id: string) {
    const res = this.menusModel.findById(id, {
      password: false,
    });
    return res;
  }

  async deleteByIds(idsToUpdate: ObjectId[]) {
    const res = await deleteByIds(this.menusModel, idsToUpdate);
    return res;
  }

  async updateOne(id: string, data: UpdateMenuDto) {
    const res = await this.menusModel
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

  async getTreeData() {
    const dataList = await this.menusModel.find().exec();
    console.log('dataList', dataList);
    console.time()
    const getTree = (parentId = null) => {
      const list = dataList.filter((dataItem) => dataItem.parent === parentId);
      return list.map((listItem) => {
        return {
          ...listItem.toObject(),
          children: getTree(listItem.id),
        };
      });
    };
    console.timeEnd()
    return getTree();
  }
}
