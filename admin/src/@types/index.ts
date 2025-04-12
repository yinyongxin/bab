import { ReactNode } from 'react';

export type Option<K = string> = {
  label: string;
  value: K;
  icon?: ReactNode;
  renderContent?: ReactNode;
};
