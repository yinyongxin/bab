import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { DepartmentsCreateBodyDto, DepartmentsQueryDto, DepartmentsUpdateDto } from './dto';
import { Departments } from '../../../mongo/base';
import { deleteByIds } from '../../../mongo/tools';
import { DeleteIdsDto } from 'src/dtos';

@Injectable()
export class DepartmentsService {
  constructor(@InjectModel(Departments.name) private departmentsModel: Model<Departments>) {}

  async addOne(data: DepartmentsCreateBodyDto) {
    const createdDepartment = new this.departmentsModel(data);
    const res = await createdDepartment.save();
    return res;
  }

  async findById(id: string) {
    const res = this.departmentsModel.findById(id, {
      password: false,
    });
    return res;
  }

  async deleteByIds(ids: DeleteIdsDto['ids']) {
    const res = await deleteByIds(
      this.departmentsModel,
      ids as unknown as ObjectId[],
    );
    return res;
  }

  async updateOne(id: string, data: DepartmentsUpdateDto) {
    const res = await this.departmentsModel
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
    // 获取所有菜单数据
    const dataList = await this.departmentsModel.find().exec();

    // 将 dataList 转换为一个 Map，便于快速查找
    const menuMap = new Map<string, (typeof dataList)[0]>();
    dataList.forEach((menuItem) => {
      menuMap.set(menuItem.id, menuItem);
    });

    // 定义递归函数以构建树形结构
    const getTree = (parentId: string) => {
      return Array.from(menuMap.values())
        .filter((menuItem) => menuItem.parent === parentId)
        .map((menuItem) => ({
          ...menuItem.toObject(), // 确保转换为普通对象
          children: getTree(menuItem._id.toString()), // 递归调用自身以查找子菜单
        }));
    };

    // 返回树形结构的根节点
    return getTree('');
  }

  getAllByFilter(filter: DepartmentsQueryDto) {
    return this.departmentsModel
      .find(filter)
      .sort({
        sort: 1,
      })
      .exec();
  }
}
