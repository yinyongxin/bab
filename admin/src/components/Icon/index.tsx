import { icons, LucideProps } from "lucide-react";

export type IconProps = LucideProps & {
	name: keyof typeof icons;
};
export const Icon = ({ name, ...rest }: IconProps) => {
	const LucideIcon = icons[name];

	return <LucideIcon {...rest} />;
};
