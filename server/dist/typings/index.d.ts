export interface TreeNode<D> {
    data: D;
    children: TreeNode<D>[];
}
export type TreeData<D> = TreeNode<D>[];
