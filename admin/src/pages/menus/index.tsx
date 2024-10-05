import { Flex, Icon, Text } from "@/components";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { TreeMenuDataDto, menusControllerGetTreeData } from "@/services";
import { useState, useEffect } from "react";
import VarticalDragDrop, {
	VarticalDragDropProps,
} from "@/components/VerticalDragDrop";
import { AddMenuDalog } from "./AddMenuDalog";

const Menus = () => {
	const [menuCheck, setMenuChecks] = useState<[string, string]>();
	const [children, setChildren] = useState<TreeMenuDataDto[]>([]);
	const [menuTree, setMenuTree] = useState<TreeMenuDataDto[]>([]);
	const getMenu = async () => {
		const res = await menusControllerGetTreeData();

		setMenuChecks([
			res.data?.[0]?._id || "",
			res.data?.[0].children?.[0]?._id || "",
		]);
		setChildren(res.data?.[0].children || []);
		setMenuTree(res.data || []);
	};

	useEffect(() => {
		getMenu();
	}, []);

	const draggableChild: VarticalDragDropProps<TreeMenuDataDto>["draggableItem"] =
		({ data, draggableStateSnapshot }) => {
			return (
				<div
					onClick={() => {
						if (!data.parent) {
							setMenuChecks([data._id, data.children?.[0]?._id || ""]);
							setChildren(data.children || []);
						}
					}}
					className={cn([
						"select-none rounded-md p-3 border bg-background shadow-sm hover:bg-accent ",
						{
							"bg-accent": draggableStateSnapshot.isDragging,
							"bg-primary text-primary-foreground shadow hover:bg-primary/90 border":
								menuCheck?.[0] === data._id,
						},
					])}
				>
					<Flex className="w-full gap-2">
						<Flex vertical flex="1" items="start">
							<Text className="text-left" bold>
								<Flex items="center" gap={2}>
									<Icon name={data.icon as any} size={20} />
									{data.name}
								</Flex>
							</Text>
							<Text type="secondary" className="text-left">
								{data.description}
							</Text>
						</Flex>
					</Flex>
				</div>
			);
		};

	return (
		<div className="grid grid-cols-3 gap-4 p-5 h-full">
			<Card className="p-4 pt-0">
				<CardHeader className="px-0 py-2">
					<CardTitle className="w-full">
						<AddMenuDalog
							sort={menuTree.length}
							success={() => {
								getMenu();
							}}
						>
							<Button variant="ghost" className="w-full" size="lg">
								<Flex items="center" gap={2}>
									<Icon name="Plus" size={18}></Icon>
									添加一级菜单
								</Flex>
							</Button>
						</AddMenuDalog>
					</CardTitle>
				</CardHeader>
				<VarticalDragDrop
					draggableItem={draggableChild}
					list={menuTree}
					uniqueKey="_id"
					onDragEnd={(newData) => {
						setMenuTree(newData);
					}}
				/>
			</Card>
			<Card className="p-4 pt-0">
				<CardHeader className="px-0 py-2">
					<CardTitle className="w-full">
						<AddMenuDalog
							sort={menuTree.length}
							parentId={menuCheck?.[0]}
							success={() => {
								getMenu();
							}}
						>
							<Button variant="ghost" className="w-full" size="lg">
								<Flex items="center" gap={2}>
									<Icon name="Plus" size={18}></Icon>
									添加二级菜单
								</Flex>
							</Button>
						</AddMenuDalog>
					</CardTitle>
				</CardHeader>
				<VarticalDragDrop
					draggableItem={draggableChild}
					list={children}
					uniqueKey="_id"
					onDragEnd={(newData) => {
						setChildren(newData);
					}}
				/>
			</Card>
			<div>3</div>
		</div>
	);
};

export default Menus;
