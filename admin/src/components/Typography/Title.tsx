import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import { cva, VariantProps } from "class-variance-authority";
import React from "react";

const titleVariants = cva("", {
	variants: {
		level: {
			h1: "scroll-m-20 text-4xl font-semibold",
			h2: "scroll-m-20 text-3xl font-semibold",
			h3: "scroll-m-20 text-2xl font-semibold",
			h4: "scroll-m-20 text-xl font-semibold",
		},
	},
	defaultVariants: {
		level: "h4",
	},
});

export interface TitleProps
	extends React.HTMLAttributes<HTMLHeadingElement>,
		VariantProps<typeof titleVariants> {
	asChild?: boolean;
}

const Title = React.forwardRef<HTMLHeadingElement, TitleProps>(
	({ className, level, asChild = false, ...props }, ref) => {
		const Comp = asChild ? Slot : level || "h4";
		return (
			<Comp
				className={cn(titleVariants({ level, className }))}
				ref={ref}
				{...props}
			/>
		);
	}
);
Title.displayName = "Title";

export { Title, titleVariants };
