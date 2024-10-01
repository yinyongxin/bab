import { Card } from "@/components/ui/card";
import {
	menusControllerGetTreeData,
	MenusControllerGetTreeDataResponse,
} from "@/services";
import { useEffect, useMemo, useState } from "react";
import MenuNavBarItem from "./MenuNavBarItem";
import UserInfo from "./UserInfo";

const MenuNavBar = () => {
	const [menuTree, setMenuTree] =
		useState<MenusControllerGetTreeDataResponse>();
	const getMenu = async () => {
		const res = await menusControllerGetTreeData();
		setMenuTree(res.data);
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
		<nav className="p-5 h-full">
			<Card className="flex justify-between flex-col gap-2 p-4 h-full">
				<div className="flex flex-col gap-2">{menuMemo}</div>
				<div>
					<UserInfo />
				</div>
			</Card>
		</nav>
	);
};
export default MenuNavBar;
