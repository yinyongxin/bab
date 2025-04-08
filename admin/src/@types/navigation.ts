export interface NavigationTree {
  key: string;
  path: string;
  title: string;
  translateKey: string;
  icon?: string;
  isHide: boolean;
  subMenu?: NavigationTree[];
}
