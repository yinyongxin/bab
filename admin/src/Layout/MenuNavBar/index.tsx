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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const MenuNavBar = () => {
	const [menuTree, setMenuTree] =
		useState<MenusControllerGetTreeDataResponse>();
	const getMenu = async () => {
		const res = await menusControllerGetTreeData();
		setMenuTree(res.data);
	};

	const menuMemo = useMemo(() => {
		return [
			...(menuTree || []),
			...(menuTree || []),
			...(menuTree || []),
			...(menuTree || []),
			...(menuTree || []),
			...(menuTree || []),
			...(menuTree || []),
			...(menuTree || []),
			...(menuTree || []),
			...(menuTree || []),
			...(menuTree || []),
		]?.map((item) => <MenuNavBarItem key={item._id} data={item} />);
	}, [menuTree]);

	useEffect(() => {
		getMenu();
	}, []);
	return (
		<nav
			// className="p-5 h-screen"
			className={cn(["p-5 h-screen", styles.menu])}
		>
			<Card className="flex justify-between flex-col gap-2 p-4 h-full">
				<div>
					<Avatar>
						<AvatarImage src="https://github.com/shadcn.png" />
						<AvatarFallback>CN</AvatarFallback>
					</Avatar>
				</div>
				<div className="flex flex-col h-full gap-2 overflow-y-auto scroll">
					{menuMemo}
				</div>
				<div>
					<UserInfo />
				</div>
			</Card>
		</nav>
	);
};
export default MenuNavBar;
