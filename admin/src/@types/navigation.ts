export interface NavigationTree {
  key: string
  path: string
  title: string
  translateKey: string
  icon: string
  type?: 'title' | 'collapse' | 'item'
  authority: string[]
  subMenu?: SubMenuNavigationTree[]
}

export interface SubMenuNavigationTree {
  key: string
  path: string
  authority: string[]
  title: string
  translateKey: string
}
