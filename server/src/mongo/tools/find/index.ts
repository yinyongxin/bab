import dayjs from 'dayjs';

/**
 * 将字符串文本的数据变为模糊查询
 * 不是字符串的字段返回
 */
export const toFuzzyParams = <N extends string = string>(
  data: Record<N, any>,
  fieldNames?: N[],
): Record<N, any> => {
  const newParams: Record<N, any> = {} as Record<N, any>;
  const names = fieldNames || (Object.keys(data) as N[]);

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
