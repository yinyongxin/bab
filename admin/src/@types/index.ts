import { ReactNode } from 'react';

export type Option<K = string> = {
  label: string;
  value: K;
  icon?: ReactNode;
  renderContent?: ReactNode;
};

export type FilterType<D = Record<string, unknown>, O = Option<any>> = {
  label?: string;
  name: keyof D;
  options?: O[];
  optionsObj?: Record<any, O>;
  placeholder?: string;
  defaultValue?: D[keyof D];
  icon?: ReactNode
};
