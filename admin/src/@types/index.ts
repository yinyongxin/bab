import { ReactNode } from 'react';

export type Option<K = string> = {
  label: string;
  value: K;
  icon?: ReactNode;
  renderContent?: ReactNode;
};

export type FilterType<D = Record<string, unknown>, O = Option<any>> = {
  name: keyof D;
  options?: O[];
  optionsObj?: Record<any, O>;
  label?: string;
  placeholder?: string;
  defaultValue?: D[keyof D];
};
