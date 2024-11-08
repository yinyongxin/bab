import dayjs from 'dayjs';
import { Model, ObjectId } from 'mongoose';

/**
 * 通过id删除
 * @param model 数据库表Model
 * @param ids ids
 * @param isFake 是否为虚假删除  默认为否
 * @returns 返回删除结果
 */
export const deleteByIds = async <M extends Model<any>>(
  model: M,
  ids: ObjectId[],
  isFake = false,
) => {
  if (isFake) {
    return model.updateMany({ _id: { $in: ids } }, { deletedTime: dayjs() });
  } else {
    return model.deleteMany({ _id: { $in: ids } });
  }
};
