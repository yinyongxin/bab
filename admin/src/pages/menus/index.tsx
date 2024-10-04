import { Flex, Icon, Text } from "@/components";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import {
	MenusControllerGetTreeDataResponse,
	menusControllerGetTreeData,
} from "@/services";
import { useState, useEffect } from "react";

const Menus = () => {
	const [secondMenus, setSecondMenus] =
		useState<MenusControllerGetTreeDataResponse>([]);

	const [firstMenuCheck, setFirstMenuCheck] = useState<string>();

	const [menuTree, setMenuTree] =
		useState<MenusControllerGetTreeDataResponse>();
	const getMenu = async () => {
		const res = await menusControllerGetTreeData();
		setFirstMenuCheck(res.data?.[0]._id);
		setSecondMenus(res.data?.[0].children || []);
		setMenuTree(res.data);
	};

	useEffect(() => {
		getMenu();
	}, []);
	return (
		<div className="grid grid-cols-3 gap-4 p-4 h-full">
			<Card className="p-4 pt-0">
				<CardHeader className="px-0 py-2">
					<CardTitle className="w-full">
						<Button variant="ghost" className="w-full" size="lg">
							<Flex items="center" gap={2}>
								<Icon name="Plus" size={18}></Icon>
								添加一级菜单
							</Flex>
						</Button>
					</CardTitle>
				</CardHeader>
				<Flex vertical gap={2}>
					{menuTree?.map((menu) => {
						return (
							<Button
								key={menu._id}
								className="h-auto"
								variant={firstMenuCheck === menu._id ? "default" : "outline"}
								onClick={() => {
									setSecondMenus(menu.children);
									setFirstMenuCheck(menu._id);
								}}
							>
								<Flex className="w-full gap-2">
									<Flex vertical flex="1" items="start">
										<Text className="text-left" bold>
											<Flex items="center" gap={2}>
												<Icon name={menu.icon as any} size={20} />
												{menu.name}
											</Flex>
										</Text>
										<Text type="muted" className="text-left">
											{menu.description}
										</Text>
									</Flex>
								</Flex>
							</Button>
						);
					})}
				</Flex>
			</Card>
			<div>2</div>
			<div>3</div>
		</div>
	);
};

export default Menus;
