import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId, Types } from 'mongoose';
import { CreateMenuBodyDto, UpdateMenuDto } from './dto';
import { Menus } from '../../../mongo/base';
import { deleteByIds } from '../../../mongo/tools';
import { TreeData } from '../../../typings';

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

    const getTree = (parentId: string) => {
      const list = dataList.filter((dataItem) => dataItem.parent === parentId);
      return list.map((listItem) => {
        return { children: getTree(listItem.id), ...listItem.toJSON() };
      });
    };
    return getTree(null) as TreeData<
      Menus & {
        _id: string;
      }
    >;
  }

  async getAllMenus() {
    const dataList = await this.menusModel.find().exec();
    return dataList;
  }
}
