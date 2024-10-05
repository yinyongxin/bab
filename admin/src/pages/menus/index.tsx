import { Flex, Icon } from "@/components";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import {
	MenusControllerGetTreeDataResponse,
	menusControllerGetTreeData,
} from "@/services";
import { useState, useEffect } from "react";

const Menus = () => {
	const [menuCheck, setMenuChecks] = useState<[string, string]>();

	const [menuTree, setMenuTree] =
		useState<MenusControllerGetTreeDataResponse>();
	const getMenu = async () => {
		const res = await menusControllerGetTreeData();

		setMenuChecks([
			res.data?.[0]?._id || "",
			res.data?.[0].children?.[0]?._id || "",
		]);
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
			</Card>
			<div></div>
			<div>3</div>
		</div>
	);
};

export default Menus;
