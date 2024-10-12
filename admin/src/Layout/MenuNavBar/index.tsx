import { Card } from "@/components/ui/card";
import {
	menusControllerGetTreeData,
	MenusControllerGetTreeDataResponse,
} from "@/services";
import { useEffect, useMemo, useState } from "react";
import MenuNavBarItem from "./MenuNavBarItem";
import UserInfo from "./UserInfo";
import { cn } from "@/lib/utils";
import styles from "./index.module.less";
import { ModeToggle } from "@/components/mode-toggle";
import { Flex, Image } from "@/components";

const MenuNavBar = () => {
	const [menuTree, setMenuTree] =
		useState<MenusControllerGetTreeDataResponse>([
			{
				_id: "1",
				name: "角色",
				children: [],
				icon: "User",
				createdTime: "",
				updatedTime: "",
				description: "",
				path: "/roles",
				sort: 0
			},
			{
				_id: "2",
				name: "管理员",
				children: [],
				icon: "Users",
				createdTime: "",
				updatedTime: "",
				path: "/admintors",
				sort: 1
			}
		]);
	const getMenu = async () => {
		const res = await menusControllerGetTreeData();
		setMenuTree(res.data || []);
	};

	const menuMemo = useMemo(() => {
		return menuTree?.map((item) => (
			<MenuNavBarItem key={item._id} data={item} />
		));
	}, [menuTree]);

	useEffect(() => {
		getMenu();
	}, []);
	return (
		<nav
			className={cn(["py-5 pl-5 h-screen", styles.menu])}
		>
			<Card className="flex justify-between flex-col gap-2 p-4 h-full">
				<div>
					<div className="w-10 h-10">
						<Image src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80" className="rounded-md" alt="logo" />
					</div>
				</div>
				<div className="flex flex-col justify-center h-full gap-2 overflow-y-auto scroll">
					{menuMemo}
				</div>
				<Flex vertical gap={2}>
					<ModeToggle single />
					<UserInfo />
				</Flex>
			</Card>
		</nav>
	);
};
export default MenuNavBar;
