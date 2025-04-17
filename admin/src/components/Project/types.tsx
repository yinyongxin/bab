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
  value: string | number;
  options?: string[];
};
