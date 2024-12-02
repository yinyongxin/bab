import { DataTable, DataTableActionRef } from "@/components/data-table";
import { admintorsControllerGetPageList, type status } from "@/services";
import { Title, Flex, Icon } from "@/components";
import { getColumns } from "./columns";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useRef, useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAppState } from "@/hooks";
import { AddAdmintorDalog } from "./add-admintor-dalog";
import { useDebounce } from "@uidotdev/usehooks";
import { EditAdmintorDalog } from "./edit-admintor-dalog";
const Admintors = () => {
	const actionRef = useRef<DataTableActionRef>(null);
	const [tabValue, tabValueAsync, setTabValue] = useAppState<status | "">(
		"",
		() => {
			actionRef.current?.refresh();
		}
	);
	const [editId, setEditId] = useState();

	const [queryUsername, queryUsernameAsync, setQueryUsername] = useAppState("");
	const debouncedSearchTerm = useDebounce(queryUsername, 300);

	useEffect(() => {
		actionRef.current?.refresh({
			showLoading: false,
		});
	}, [debouncedSearchTerm]);

	return (
		<div className="p-5 flex flex-col gap-4">
			<Title level="h4">管理人员</Title>
			<Flex justify="between" items="center">
				<Flex gap={2} flex="1">
					<Tabs
						value={tabValue}
						onValueChange={(value) => {
							setTabValue(value as status);
						}}
					>
						<TabsList>
							<TabsTrigger value={""}>全部</TabsTrigger>
							<TabsTrigger value="Open">开启</TabsTrigger>
							<TabsTrigger value="Close">关闭</TabsTrigger>
						</TabsList>
					</Tabs>
					<Input
						className="w-1/3"
						placeholder="搜索"
						value={queryUsername}
						onChange={(e) => setQueryUsername(e.target.value)}
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
				<AddAdmintorDalog
					success={() => {
						actionRef.current?.refresh();
					}}
				>
					<Button>
						<Icon name="Plus" className="mr-2 h-4 w-4" />
						新增
					</Button>
				</AddAdmintorDalog>
			</Flex>

			<DataTable
				actionRef={actionRef}
				border
				columns={getColumns({ actionRef, setEditId })}
				getData={async (pagination) => {
					const res = await admintorsControllerGetPageList({
						query: {
							pageNo: pagination.pageIndex + 1,
							pageSize: pagination.pageSize,
						},
						body: {
							status: tabValueAsync ? tabValueAsync : undefined,
							username: queryUsernameAsync,
						},
					});
					return {
						total: res.data?.total || 0,
						list: res.data?.list || [],
					};
				}}
			/>
			<EditAdmintorDalog
				id={editId}
				onClose={() => {
					setEditId(undefined);
				}}
			/>
		</div>
	);
};

export default Admintors;
