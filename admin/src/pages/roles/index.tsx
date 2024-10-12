import { DataTableActionRef } from "@/components/DataTable";
import { rolesControllerGetPageList } from "@/services";
import { Title, Flex, Icon, Image } from "@/components";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useRef, useState } from "react";
import { useAppState } from "@/hooks";
import { AddAdmintorDialog } from "./AddAdmintorDialog";
import { useDebounce } from "@uidotdev/usehooks";
import { EditAdmintorDialog } from "./EditAdmintorDialog";
import { PaginationData } from "@/components/PaginationData";
import { Card, CardContent, CardDescription, CardFooter, CardTitle } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Separator } from "@/components/ui/separator";
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
							list: [{ name: "name", _id: "_id", icon: 'icon', createdTime: 'createdTime', updatedTime: 'updatedTime', description: 'description' }],
						};
					}
				}}
				itemKey="_id"
				dataItemRender={(dataItem) => {
					return (
						<Card>
							<AspectRatio ratio={16 / 9} >
								<Image src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80" className="rounded-t-md" alt="logo" />
							</AspectRatio>
							<CardContent className="px-3 pb-3">

								<CardTitle>
									{dataItem.name}
								</CardTitle>
								<CardDescription className="mt-3">
									{dataItem.description}
								</CardDescription>
							</CardContent>
								<Separator />
							<CardFooter className="p-3">
								<div className="w-full flex justify-around h-5 items-center gap-1 text-sm">
									<Icon name={"View"} className="h-5 w-5 cursor-pointer" />
									<Separator orientation="vertical" />
									<Icon name={"Pencil"} className="h-5 w-5 cursor-pointer" />
									<Separator orientation="vertical" />
									<Icon name={"Trash"} className="h-5 w-5 cursor-pointer" />
								</div>
							</CardFooter>
						</Card>
					)
				}}
				cols={6}
				gap={2}
			/>
			<Separator orientation="vertical" className="h-full w-1" />
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
