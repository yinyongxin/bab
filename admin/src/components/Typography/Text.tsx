import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import { cva, VariantProps } from "class-variance-authority";
import React from "react";

export const textVariants = cva("", {
	variants: {
		type: {
			default: "",
			muted: "text-muted-foreground",
			danger: "text-red-500",
			warning: "text-orange-500",
			success: "text-green-500",
		},
	},
	defaultVariants: {
		type: "default",
	},
});

export interface TextProps
	extends React.HTMLAttributes<HTMLSpanElement>,
		VariantProps<typeof textVariants> {
	asChild?: boolean;
	bold?: boolean;
	size?: "xs" | "sm" | "base" | "lg" | "xl";
}

export const Text = React.forwardRef<HTMLSpanElement, TextProps>(
	(
		{ className, size = "base", bold, type, asChild = false, ...props },
		ref
	) => {
		const Comp = asChild ? Slot : "span";
		return (
			<Comp
				className={cn([
					textVariants({ type, className }),
					bold && "font-bold",
					`text-${size}`,
				])}
				ref={ref}
				{...props}
			/>
		);
	}
);
Text.displayName = "Text";
