import dayjs from 'dayjs';
import { isString } from 'radash';

/**
 * 将字符串文本的数据变为模糊查询
 * 不是字符串的字段返回
 */
export const toFuzzyParams = <N = string>(
  data: Record<string, any>,
  fieldNames?: N[],
) => {
  const newParams = {};
  const names = fieldNames || Object.keys(data);
  names.forEach((name) => {
    const value = data[name];
    const isDateTime = dayjs(value).isValid();
    if (!isDateTime && isString(value)) {
      newParams[name] = new RegExp(`${data[name]}`);
    } else {
      newParams[name] = value;
    }
  });
  return newParams;
};
