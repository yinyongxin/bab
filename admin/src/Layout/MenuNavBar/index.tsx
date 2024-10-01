import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
	HoverCard,
	HoverCardContent,
	HoverCardTrigger,
} from "@/components/ui/hover-card";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import {
	menusControllerGetTreeData,
	MenusControllerGetTreeDataResponse,
} from "@/services";
import { Settings, Home } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const MenuNavBar = () => {
	let location = useLocation();

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
					<TooltipProvider delayDuration={0}>
						<Tooltip>
							<TooltipTrigger>
								<Button
									asChild
									className="h-10 w-10"
									variant={
										location.pathname === "/home" ? "default" : "secondary"
									}
									size="icon"
								>
									<Link to="/home">
										<Home />
									</Link>
								</Button>
							</TooltipTrigger>
							<TooltipContent side="right" className="ml-6">
								<p>首页</p>
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>

					<HoverCard openDelay={0} closeDelay={100}>
						<HoverCardTrigger asChild>
							<Button
								className="h-10 w-10"
								size="icon"
								variant={
									location.pathname === "/setting" ? "default" : "secondary"
								}
								asChild
								onClick={() => {}}
							>
								<Link to="/setting">
									<Settings />
								</Link>
							</Button>
						</HoverCardTrigger>
						<HoverCardContent side="right" align="start" className="ml-6">
							The React Framework – created and maintained by @vercel.
						</HoverCardContent>
					</HoverCard>
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
