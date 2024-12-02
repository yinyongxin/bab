import * as React from "react";

import { cn } from "@/lib/utils";
import { Button, ButtonProps } from "@/components/ui/button";
import { Icon } from "../icon";

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
	<Button
		variant={isActive ? "default" : "ghost"}
		size="icon"
		className="h-8 w-8"
		{...props}
	/>
);
PaginationLink.displayName = "PaginationLink";

const PaginationPrevious = ({ className, ...props }: ButtonProps) => (
	<PaginationLink
		variant={"ghost"}
		className={cn(["p-0 ", className])}
		{...props}
	>
		<Icon name="ChevronLeft" className="text-xl"></Icon>
	</PaginationLink>
);
PaginationPrevious.displayName = "PaginationPrevious";

const PaginationNext = ({ className, ...props }: ButtonProps) => (
	<PaginationLink
		variant={"ghost"}
		className={cn(["p-0", className])}
		{...props}
	>
		<Icon name="ChevronRight" className="text-xl"></Icon>
	</PaginationLink>
);
PaginationNext.displayName = "PaginationNext";

const PaginationEllipsis = ({ className, ...props }: ButtonProps) => (
	<PaginationLink
		variant={"ghost"}
		className={cn(["p-0", className])}
		{...props}
	>
		<Icon name="Ellipsis" size={14}></Icon>
	</PaginationLink>
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
