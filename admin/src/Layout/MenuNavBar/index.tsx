import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import {
	HoverCard,
	HoverCardContent,
	HoverCardTrigger,
} from "@/components/ui/hover-card";
import {
	menusControllerGetTreeData,
	MenusControllerGetTreeDataResponse,
} from "@/services";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import MenuNavBarItem from "./MenuNavBarItem";

const MenuNavBar = () => {
	const [menuTree, setMenuTree] =
		useState<MenusControllerGetTreeDataResponse>();
	const getMenu = async () => {
		const res = await menusControllerGetTreeData();
		setMenuTree(res.data);
	};
	useEffect(() => {
		getMenu();
	}, []);
	return (
		<nav className="p-5 h-full">
			<Card className="flex justify-between flex-col gap-2 p-4 h-full">
				<div className="flex flex-col gap-2">
					{menuTree?.map((item) => (
						<MenuNavBarItem key={item._id} data={item} />
					))}
				</div>
				<div>
					<HoverCard openDelay={0} closeDelay={100}>
						<HoverCardTrigger>
							<Avatar>
								<AvatarImage src="https://github.com/shadcn.png" />
								<AvatarFallback>CN</AvatarFallback>
							</Avatar>
						</HoverCardTrigger>
						<HoverCardContent side="right" align="end" className="ml-6 -mb-4">
							The React Framework – created and maintained by @vercel.
						</HoverCardContent>
					</HoverCard>
				</div>
			</Card>
		</nav>
	);
};
export default MenuNavBar;
