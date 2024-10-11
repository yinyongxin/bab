import { DataTableActionRef } from "@/components/DataTable";
import { rolesControllerGetPageList } from "@/services";
import { Title, Flex, Icon } from "@/components";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useRef, useState } from "react";
import { useAppState } from "@/hooks";
import { AddAdmintorDialog } from "./AddAdmintorDialog";
import { useDebounce } from "@uidotdev/usehooks";
import { EditAdmintorDialog } from "./EditAdmintorDialog";
import { PaginationData } from "@/components/PaginationData";
import { Card } from "@/components/ui/card";
const Roles = () => {
	const actionRef = useRef<DataTableActionRef>(null);
	const [editId, setEditId] = useState();

	const [queryName, queryNameAsync, setQueryName] = useAppState("");
	const debouncedSearchTerm = useDebounce(queryName, 300);

	useEffect(() => {
		actionRef.current?.refresh({
			showLoading: false,
		});
	}, [debouncedSearchTerm]);

	return (
		<div className="p-5 flex flex-col gap-4">
			<Title level="h4">人员角色</Title>
			<Flex justify="between" items="center">
				<Flex gap={2} flex="1">
					<Input
						className="w-1/3"
						placeholder="搜索"
						value={queryName}
						onChange={(e) => setQueryName(e.target.value)}
					/>
					<Button
						onClick={() => {
							actionRef.current?.refresh();
						}}
					>
						<Icon name="Search" className="mr-2 h-4 w-4" />
						搜索
					</Button>
				</Flex>
				<AddAdmintorDialog
					success={() => {
						actionRef.current?.refresh();
					}}
				>
					<Button>
						<Icon name="Plus" className="mr-2 h-4 w-4" />
						新增
					</Button>
				</AddAdmintorDialog>
			</Flex>

			<PaginationData
				actionRef={actionRef}
				getData={async (pagination) => {
					try {
						const res = await rolesControllerGetPageList({
							query: {
								pageNo: pagination.pageIndex + 1,
								pageSize: pagination.pageSize,
							},
							body: {
								name: queryNameAsync,
							},
						});
						return {
							total: res.data?.total || 0,
							list: res.data?.list || [],
						};
					} catch (error) {
						return {
							total: 100,
							list: [{ name: "error", _id: "error", icon: 'error', createdTime: 'error', updatedTime: 'error', description: 'error' }],
						};
					}
				}}
				dataItemRender={(dataItem) => {
					return (
						<Card>
							<div>
								{dataItem.name}
							</div>
							<div>
								{dataItem.name}
							</div>
							<div>
								{dataItem.name}
							</div>
							<div>
								{dataItem.name}
							</div>
							<div>
								{dataItem.name}
							</div>
						</Card>
					)
				}}
				cols={6}
				gap={2}
			/>
			<EditAdmintorDialog
				id={editId}
				onClose={() => {
					setEditId(undefined);
				}}
			/>
		</div>
	);
};

export default Roles;
