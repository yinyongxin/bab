export type TreeData<D> = (D & {
  children: TreeData<D>;
})[];
