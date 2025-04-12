import { ReactNode } from 'react';

export type Option<K = string> = {
  label: string;
  value: K;
  icon?: ReactNode;
  renderContent?: ReactNode;
};

export type FilterType<D = unknown> = {
  name: keyof D;
  options: Option<any>[];
  optionsObj: Record<any, Option<any>>;
  placeholder: string;
};
