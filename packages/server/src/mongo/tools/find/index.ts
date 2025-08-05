import dayjs from 'dayjs';
import { Model } from 'mongoose';
import { DateTimeRangeDto, PaginationDto } from 'src/dtos';

/**
 * 将字符串文本的数据变为模糊查询
 * 不是字符串的字段返回
 */
export const toFuzzyParams = <D = Record<string, unknown>, K = keyof D>(
  data?: D,
  fieldNames?: (keyof D)[],
): D => {
  const newParams: D = {} as D;
  if (!data) {
    return newParams;
  }
  const names = fieldNames || (Object.keys(data) as K[]);

  if (!names.length) {
    return newParams;
  }

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

export const getDateTimeRange = (dateTimeRangeDto?: DateTimeRangeDto) => {
  const range = {};
  if (!dateTimeRangeDto) {
    return range;
  }
  for (const key in dateTimeRangeDto) {
    if (dateTimeRangeDto.hasOwnProperty(key)) {
      const value = dateTimeRangeDto[key];
      if (value) {
        range[key] = {
          $gte: new Date(value[0]),
          $lte: new Date(value[1]),
        };
      }
    }
  }
  return range;
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
