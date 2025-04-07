import dayjs from 'dayjs';
import { Model } from 'mongoose';
import { PaginationDto } from 'src/dtos';

/**
 * 将字符串文本的数据变为模糊查询
 * 不是字符串的字段返回
 */
export const toFuzzyParams = <D = Record<string, unknown>, K = keyof D>(
  data: D,
  fieldNames?: (keyof D)[],
): D => {
  const newParams: D = {} as D;
  const names = fieldNames || (Object.keys(data) as K[]);

  names.forEach((name) => {
    const value = data[name];

    // 检查值是否为有效的日期
    const isDateTime = dayjs(value).isValid();

    // 处理不同类型的值
    if (!isDateTime && typeof value === 'string' && value.trim() !== '') {
      // 防止构造空正则或无效正则
      newParams[name] = new RegExp(value.trim(), 'i'); // 'i' 用于忽略大小写
    } else if (value !== undefined && value !== null) {
      // 其他类型简单传递
      newParams[name] = value;
    }
  });

  return newParams;
};

export const queryPagination = async <
  M extends Model<any>,
  F = Record<string, unknown>,
>(
  model: M,
  pagination: PaginationDto,
  filter?: F,
  options?: {
    sort: Record<string, 1 | -1>;
  },
) => {
  const { sort } = { sort: { createdTime: -1 }, ...options };
  const [res] = await model.aggregate([
    { $match: { ...filter } },
    { $sort: sort },
    {
      $facet: {
        metadata: [{ $count: 'total' }],
        list: [
          { $skip: pagination.pageSize * (pagination.pageNo - 1) },
          { $limit: pagination.pageSize },
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
  return {
    total: res?.total || 0,
    list: res?.list || [],
  };
};
