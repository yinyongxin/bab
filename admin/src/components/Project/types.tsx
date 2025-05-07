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

export enum ModeEnum {
  QUANTITY = 'quantity',
  TIMERANGE = 'timerange',
}

export type ProjectType = {
  id?: string;
  name: string;
  description: string;
  detail: string;
  variationList: StandardsItem[][];
  inventoryList: {
    variations: StandardsItem[];
    value: number;
  }[];
  timeRange: {
    start: string;
    end: string;
  };
  weekRange: number[];
  mode: ModeEnum;
  price: number;
  discount: number;
  discountType: DiscountTypeEnum;
};
