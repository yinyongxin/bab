import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import { cva, VariantProps } from "class-variance-authority";
import React from "react";

const textVariants = cva("", {
	variants: {
		size: {
			small: "text-sm",
			default: "text-base",
			large: "text-lg",
		},
		type: {
			default: "text-primary",
			muted: "text-muted-foreground",
			error: "text-red-500",
			warning: "text-orange-500",
			success: "text-green-500",
		},
	},
	defaultVariants: {
		size: "default",
		type: "default",
	},
});

export interface TextProps
	extends React.HTMLAttributes<HTMLSpanElement>,
		VariantProps<typeof textVariants> {
	asChild?: boolean;
	bold?: boolean;
}

const Text = React.forwardRef<HTMLSpanElement, TextProps>(
	({ className, size, bold, type, asChild = false, ...props }, ref) => {
		const Comp = asChild ? Slot : "span";
		return (
			<Comp
				className={cn([
					textVariants({ size, type, className }),
					bold && "font-bold",
				])}
				ref={ref}
				{...props}
			/>
		);
	}
);
Text.displayName = "Text";

export { Text, textVariants };
