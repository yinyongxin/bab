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
import { Flex, Icon, Title, Text, IconProps } from "@/components";
import { useRef, useState } from "react";
import { cn } from "@/lib/utils";

export type MenuNavBarItemProps = {
	data: TreeMenuDataDto;
};
const MenuNavBarItem = (props: MenuNavBarItemProps) => {
	const location = useLocation();
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
					<Icon name={data.icon as IconProps["name"]} />
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
				<div className="flex flex-col gap-2">
					{data.children?.map((child) => {
						return (
							<div key={child._id}>
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
											<Icon name={child.icon as IconProps["name"]} />
										</Flex>
										<Flex
											vertical
											justify="between"
											className="overflow-hidden"
										>
											<Text bold>{child.name}</Text>
											{child.description && (
												<Text size="sm" className="truncate">
													{child.description}
												</Text>
											)}
										</Flex>
									</Flex>
								</div>
							</div>
						);
					})}
				</div>
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
						<Icon name={data.icon as IconProps["name"]} />
					</Button>
				</TooltipTrigger>
				<TooltipContent side="right" className="ml-6 p-3">
					<Flex vertical gap={2}>
						<Text bold>{data.name}</Text>
						{data.description && (
							<Text size="sm" className="truncate">
								{data.description}
							</Text>
						)}
					</Flex>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
	return data.children.length === 0 ? notChildren : hasChildren;
};

export default MenuNavBarItem;
