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
import { Flex, Icon, Title, Text } from "@/components";
import { useRef, useState } from "react";
import { cn } from "@/lib/utils";

export type MenuNavBarItemProps = {
	data: TreeMenuDataDto;
};
const MenuNavBarItem = (props: MenuNavBarItemProps) => {
	let location = useLocation();
	const navigate = useNavigate();
	const [open, setOpen] = useState(false);
	const { data } = props;
	const ref = useRef<{
		time: NodeJS.Timeout | null;
	}>({
		time: null,
	});
	const hasChildren = (
		<HoverCard open={open}>
			<HoverCardTrigger
				onMouseEnter={() => {
					if (ref.current.time) {
						clearTimeout(ref.current.time);
					}
					setOpen(true);
				}}
				onMouseLeave={() => {
					ref.current.time = setTimeout(() => {
						setOpen(false);
					}, 200);
				}}
				asChild
			>
				<Button
					className="h-10 w-10"
					size="icon"
					variant={
						data.children.map((child) => child.path).includes(location.pathname)
							? "default"
							: "secondary"
					}
				>
					<Icon name={data.icon as any} />
				</Button>
			</HoverCardTrigger>
			<HoverCardContent
				onMouseEnter={() => {
					if (ref.current.time) {
						clearTimeout(ref.current.time);
					}
				}}
				onMouseLeave={() => {
					ref.current.time = setTimeout(() => {
						setOpen(false);
					}, 200);
				}}
				side="right"
				align="start"
				className="translate-x-6"
			>
				<Title className="mb-2">{data.name}</Title>
				{data.children?.map((child) => {
					return (
						<div key={data._id}>
							<div
								className={cn([
									"bg-secondary hover:bg-primary",
									"text-secondary-foreground hover:text-primary-foreground",
									"p-2 rounded-md cursor-pointer transition-colors duration-200",
									{
										"bg-primary text-primary-foreground":
											location.pathname === child.path,
									},
								])}
								onClick={() => {
									navigate(child.path);
								}}
							>
								<Flex gap={2}>
									<Flex center className={cn(["h-12 w-12"])}>
										<Icon name={child.icon as any} />
									</Flex>
									<Flex vertical justify="between" className="overflow-hidden">
										<Text size="sm">{child.name}</Text>
										<Text size="sm" type="muted" className="truncate">
											{child.description}
										</Text>
									</Flex>
								</Flex>
							</div>
						</div>
					);
				})}
			</HoverCardContent>
		</HoverCard>
	);
	const notChildren = (
		<TooltipProvider>
			<Tooltip open={open}>
				<TooltipTrigger
					onMouseEnter={() => {
						if (ref.current.time) {
							clearTimeout(ref.current.time);
						}
						setOpen(true);
					}}
					onMouseLeave={() => {
						setOpen(false);
					}}
					asChild
				>
					<Button
						className="h-10 w-10"
						variant={location.pathname === data.path ? "default" : "secondary"}
						size="icon"
						onClick={() => {
							navigate(data.path);
						}}
					>
						<Icon name={data.icon as any} />
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
