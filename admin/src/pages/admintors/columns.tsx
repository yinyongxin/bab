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

export const getColumns = (
	actionRef: React.RefObject<DataTableActionRef>
): ColumnDef<ResultAdmintorDto>[] => [
	{
		accessorKey: "username",
		header: "管理员",
		cell: ({ row }) => {
			return (
				<Flex gap={2} align="center">
					<Avatar>
						<AvatarImage src={""} />
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
								actionRef.current?.refresh({
									showLoading: false,
								});
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
						<DropdownMenuTrigger asChild>
							<Button size="icon" variant="ghost">
								<Icon name="Ellipsis" size={16} />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end">
							<DropdownMenuItem>
								<Flex gap={2} align="center">
									<Icon name="Pencil" size={14} />
									<Text size="sm">编辑</Text>
								</Flex>
							</DropdownMenuItem>
							<DropdownMenuItem>
								<Text type="danger" size="sm">
									<Flex gap={2} align="center">
										<Icon name="Trash" size={14} />
										删除
									</Flex>
								</Text>
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</Flex>
			);
		},
	},
];
