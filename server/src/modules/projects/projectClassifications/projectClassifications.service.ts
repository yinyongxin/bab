import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import {
  ProjectClassificationsCreateBodyDto,
  ProjectClassificationsQueryDto,
  ProjectClassificationsUpdateDto,
} from './dto';
import { ProjectClassifications } from '../../../mongo/projects/projectClassifications';
import { deleteByIds } from '../../../mongo/tools';
import { DeleteIdsDto } from 'src/dtos';

@Injectable()
export class ProjectClassificationsService {
  constructor(
    @InjectModel(ProjectClassifications.name)
    private projectClassificationsModel: Model<ProjectClassifications>,
  ) {}

  async addOne(data: ProjectClassificationsCreateBodyDto) {
    const createdMenu = new this.projectClassificationsModel(data);
    const res = await createdMenu.save();
    return res;
  }

  async findById(id: string) {
    const res = this.projectClassificationsModel.findById(id, {
      password: false,
    });
    return res;
  }

  async deleteByIds(idsToUpdate: DeleteIdsDto['ids']) {
    const res = await deleteByIds(
      this.projectClassificationsModel,
      idsToUpdate as unknown as ObjectId[],
    );
    return res;
  }

  async updateOne(id: string, data: ProjectClassificationsUpdateDto) {
    const res = await this.projectClassificationsModel
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
    const dataList = await this.projectClassificationsModel.find().exec();

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

  getAllByFilter(filter: ProjectClassificationsQueryDto) {
    return this.projectClassificationsModel
      .find(filter)
      .sort({
        sort: 1,
      })
      .exec();
  }
}
