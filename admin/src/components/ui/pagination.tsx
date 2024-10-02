import * as React from "react";

import { cn } from "@/lib/utils";
import { Button, ButtonProps } from "@/components/ui/button";
import { Icon } from "../Icon";

const Pagination = ({ className, ...props }: React.ComponentProps<"nav">) => (
	<nav
		role="navigation"
		aria-label="pagination"
		className={cn("flex w-max justify-center", className)}
		{...props}
	/>
);
Pagination.displayName = "Pagination";

const PaginationContent = React.forwardRef<
	HTMLUListElement,
	React.ComponentProps<"ul">
>(({ className, ...props }, ref) => (
	<ul
		ref={ref}
		className={cn("flex flex-row items-center gap-1", className)}
		{...props}
	/>
));
PaginationContent.displayName = "PaginationContent";

const PaginationItem = React.forwardRef<
	HTMLLIElement,
	React.ComponentProps<"li">
>(({ className, ...props }, ref) => (
	<li ref={ref} className={cn("", className)} {...props} />
));
PaginationItem.displayName = "PaginationItem";

type PaginationLinkProps = {
	isActive?: boolean;
} & ButtonProps;

const PaginationLink = ({ isActive, ...props }: PaginationLinkProps) => (
	<Button variant={isActive ? "default" : "ghost"} size="icon" {...props} />
);
PaginationLink.displayName = "PaginationLink";

const PaginationPrevious = ({ className, ...props }: ButtonProps) => (
	<Button
		variant={"ghost"}
		className={cn(["p-0 h-9 w-9 ", className])}
		{...props}
	>
		<Icon name="ChevronLeft" className="text-xl"></Icon>
	</Button>
);
PaginationPrevious.displayName = "PaginationPrevious";

const PaginationNext = ({ className, ...props }: ButtonProps) => (
	<Button
		variant={"ghost"}
		className={cn(["p-0 h-9 w-9", className])}
		{...props}
	>
		<Icon name="ChevronRight" className="text-xl"></Icon>
	</Button>
);
PaginationNext.displayName = "PaginationNext";

const PaginationEllipsis = ({
	className,
	...props
}: React.ComponentProps<"span">) => (
	<span
		aria-hidden
		className={cn("flex h-9 w-9 items-center justify-center", className)}
		{...props}
	>
		<Icon name="Ellipsis" size={14}></Icon>
		<span className="sr-only">More pages</span>
	</span>
);
PaginationEllipsis.displayName = "PaginationEllipsis";

export {
	Pagination,
	PaginationContent,
	PaginationLink,
	PaginationItem,
	PaginationPrevious,
	PaginationNext,
	PaginationEllipsis,
};
