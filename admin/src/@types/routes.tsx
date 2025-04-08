import type { LazyExoticComponent } from 'react';

export type Route = {
  key: string;
  path: string;
  component: LazyExoticComponent<<T>(props: T) => JSX.Element>;
};

export type Routes = Route[];
