export enum StandardsTypeEnum {
  COLOR,
  NUMBER,
  TEXT,
  SELECT,
}

export type StandardsItem = {
  _id: string;
  name: string;
  unit: string;
  standardsType: StandardsTypeEnum;
  value: string;
  options?: string[];
};

export enum DiscountTypeEnum {
  NONE = 'NONE',
  PERCENTAGE = 'PERCENTAGE',
  FIXED = 'FIXED',
}

export type ProjectType = {
  id?: string;
  name: string;
  description: string;
  detail: string;
  variationList: StandardsItem[][];
  inventoryList: {
    variations: StandardsItem;
    value: number;
  }[];
  price: number;
  discount: number;
  discountType: DiscountTypeEnum;
};
