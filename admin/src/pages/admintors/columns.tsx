import { DataTableActionRef, Flex, Icon, Text } from "@/components";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Switch } from "@/components/ui/switch";
import { admintorsControllerUpdateOne, ResultAdmintorDto } from "@/services";
import { ColumnDef } from "@tanstack/react-table";
import { RefObject } from "react";

export const getColumns = (
	actionRef: React.RefObject<DataTableActionRef>
): ColumnDef<ResultAdmintorDto>[] => [
	{
		accessorKey: "username",
		header: "姓名",
		cell: ({ row }) => {
			return (
				<Flex gap={2} align="center">
					<Avatar>
						<AvatarImage src={row.getValue("avatar")} />
						<AvatarFallback />
					</Avatar>
					<Text>
						<Text>{row.getValue("username")}</Text>
					</Text>
				</Flex>
			);
		},
	},
	{
		accessorKey: "status",
		header: "状态",
		cell: ({ row }) => {
			return (
				<Flex align="center">
					<Switch
						checked={row.getValue("status") === "Open"}
						onClick={async () => {
							try {
								await admintorsControllerUpdateOne({
									query: {
										id: row.getValue("id"),
									},
									body: {
										status:
											row.getValue("status") === "Open" ? "Close" : "Open",
									},
								});
								// actionRef.current?.refresh();
							} catch (error) {
								console.log(error);
							}
						}}
					/>
				</Flex>
			);
		},
	},
	{
		accessorKey: "createdTime",
		header: "创建时间",
	},
	{
		accessorKey: "updatedTime",
		header: "更新时间",
	},
	{
		accessorKey: "id",
		header: () => <Flex justify="center">操作</Flex>,

		cell: ({ row }) => {
			return (
				<Flex justify="center">
					<DropdownMenu>
						<DropdownMenuTrigger>
							<Button size="icon" variant="ghost">
								<Icon name="Ellipsis" size={16} />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end">
							<DropdownMenuItem>编辑</DropdownMenuItem>
							<DropdownMenuItem>删除</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</Flex>
			);
		},
	},
];
