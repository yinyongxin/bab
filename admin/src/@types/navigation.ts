export interface NavigationTree {
  key: string;
  path: string;
  title: string;
  translateKey: string;
  icon?: string;
  subMenu?: SubMenuNavigationTree[];
}

export interface SubMenuNavigationTree {
  key: string;
  path: string;
  title: string;
  translateKey: string;
}
