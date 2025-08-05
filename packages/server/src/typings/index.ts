export interface TreeNode<D> {
  data: D; // 每个节点的数据
  children: TreeNode<D>[]; // 子节点是一个数组
}

export type TreeData<D> = TreeNode<D>[]; // 整个树形结构是一个节点数组
