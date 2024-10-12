import { DataTableActionRef, Flex, Icon, Text } from "@/components";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuPortal,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/hooks/use-toast";
import {
	admintorsControllerDeleteByIds,
	admintorsControllerUpdateOne,
	ResultAdmintorDto,
} from "@/services";
import { getFormattedDate } from "@/utils";
import { ColumnDef } from "@tanstack/react-table";
import { EditAdmintorDalog } from "./EditAdmintorDalog";

export const getColumns = (options: {
	actionRef: React.RefObject<DataTableActionRef>;
	setEditId: React.Dispatch<React.SetStateAction<undefined>>;
}): ColumnDef<ResultAdmintorDto>[] => [
	{
		accessorKey: "username",
		header: "管理员",
		minSize: 250,
		cell: ({ row }) => {
			return (
				<Flex gap={2} items="center">
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
		size: 100,
		cell: ({ row }) => {
			return (
				<Flex items="center">
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
								toast({
									title: "通知",
									description: "更新成功",
								});
								options.actionRef.current?.refresh({
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

		accessorFn: (row) => {
			return getFormattedDate(row.createdTime);
		},
	},
	{
		// accessorKey: "updatedTime",
		header: "更新时间",
		accessorFn: (row) => {
			return getFormattedDate(row.updatedTime);
		},
	},
	{
		accessorKey: "id",
		header: () => <Flex justify="center">操作</Flex>,
		size: 50,
		cell: ({ row }) => {
			return (
				<Flex justify="center">
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button size="icon" variant="ghost">
								<Icon name="Ellipsis" size={16} />
							</Button>
						</DropdownMenuTrigger>

						<DropdownMenuPortal>
							<DropdownMenuContent side="left" align="center">
								<DropdownMenuItem
									onClick={() => {
										options.setEditId(row.getValue("id"));
									}}
								>
									<Flex gap={2} items="center">
										<Icon name="Pencil" size={14} />
										<Text size="sm">编辑</Text>
									</Flex>
								</DropdownMenuItem>

								<DropdownMenuItem
									onClick={async () => {
										await admintorsControllerDeleteByIds({
											body: {
												ids: [row.getValue("id")],
											},
										});
										options.actionRef.current?.refresh({
											showLoading: false,
										});
									}}
								>
									<Text type="danger" size="sm">
										<Flex gap={2} items="center">
											<Icon name="Trash" size={14} />
											删除
										</Flex>
									</Text>
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenuPortal>
					</DropdownMenu>
				</Flex>
			);
		},
	},
];
