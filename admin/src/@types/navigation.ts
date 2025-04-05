export interface NavigationTree {
  key: string;
  path: string;
  title: string;
  translateKey: string;
  icon?: string;
  authority: string[];
  subMenu?: SubMenuNavigationTree[];
}

export interface SubMenuNavigationTree {
  key: string;
  path: string;
  authority: string[];
  title: string;
  translateKey: string;
}
