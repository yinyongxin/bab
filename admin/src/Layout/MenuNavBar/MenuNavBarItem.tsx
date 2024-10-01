import { Button } from "@/components/ui/button";
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
import { TreeMenuDataDto } from "@/services";
import { useLocation, useNavigate } from "react-router-dom";
import { Icon } from "@/components";

export type MenuNavBarItemProps = {
	data: TreeMenuDataDto;
};
const MenuNavBarItem = (props: MenuNavBarItemProps) => {
	let location = useLocation();
	const navigate = useNavigate();
	const { data } = props;
	const hasChildren = (
		<HoverCard openDelay={0} closeDelay={100}>
			<HoverCardTrigger>
				<Button
					className="h-10 w-10"
					size="icon"
					variant={location.pathname === data.path ? "default" : "secondary"}
					onClick={() => {
						navigate(data.path);
					}}
				>
					<Icon name="House" />
				</Button>
			</HoverCardTrigger>
			<HoverCardContent side="right" align="start" className="ml-6">
				The React Framework – created and maintained by @vercel.
			</HoverCardContent>
		</HoverCard>
	);
	const notChildren = (
		<TooltipProvider delayDuration={0}>
			<Tooltip>
				<TooltipTrigger asChild>
					<Button
						className="h-10 w-10"
						variant={location.pathname === data.path ? "default" : "secondary"}
						size="icon"
						onClick={() => {
							navigate(data.path);
						}}
					>
						<Icon name="House" />
					</Button>
				</TooltipTrigger>
				<TooltipContent side="right" className="ml-6">
					{data.name}
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
	return data.children.length === 0 ? notChildren : hasChildren;
};

export default MenuNavBarItem;
