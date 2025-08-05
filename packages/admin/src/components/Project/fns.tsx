import { StandardsItem } from './types';

// 递归生成规格组合
export const getGenerateCombinations = (
  data: StandardsItem[][],
  prefix: StandardsItem[] = [],
  index: number = 0,
  result: StandardsItem[][] = [],
) => {
  // 当当前索引等于数据长度时，将当前组合添加到结果数组中
  if (index === data.length) {
    result.push(prefix);
    return result; // 返回生成的结果
  }

  const currentSpec = data[index]; // 获取当前规格

  currentSpec.forEach((value) => {
    // 为每个值创建新的组合
    getGenerateCombinations(data, [...prefix, value], index + 1, result); // 递归进入下一规格
  });

  return result; // 返回生成的结果
};
