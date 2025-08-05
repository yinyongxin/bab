import { LooseKeys } from '@mantine/form/lib/paths.types';
import { ReactNode } from 'react';

export type Option<K = string | boolean> = {
  label: string;
  value: K;
  icon?: ReactNode;
  renderContent?: ReactNode;
};

export type FilterType<D = Record<string, unknown>, O = Option<any>> = {
  label?: string;
  name: LooseKeys<D>;
  options?: O[];
  optionsObj?: Record<any, O>;
  placeholder?: string;
  defaultValue?: D[keyof D];
  icon?: ReactNode;
};
