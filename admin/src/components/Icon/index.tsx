import { lazy, Suspense } from "react";
import { LucideProps } from "lucide-react";
import dynamicIconImports from "lucide-react/dynamicIconImports";

export interface IconProps extends Omit<LucideProps, "ref"> {
	name: keyof typeof dynamicIconImports;
}

export const Icon = ({ name, size, ...props }: IconProps) => {
	const LucideIcon = lazy(dynamicIconImports[name]);
	const fallback = (
		<div style={{ background: "#ddd", width: size, height: size }} />
	);
	return (
		<Suspense fallback={fallback}>
			<LucideIcon size={size} {...props} />
		</Suspense>
	);
};
