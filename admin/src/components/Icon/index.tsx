// 从 lucide-react 包中导入图标和 LucideProps 类型
import { cn } from "@/lib/utils";
import { icons, LucideProps } from "lucide-react";

/**
 * 定义 IconProps 类型，它是 LucideProps 类型的扩展，增加了 name 属性
 * name 属性是 icons 对象的键，用于指定要显示的图标
 */
export type IconProps = LucideProps & {
	name: keyof typeof icons;
};

/**
 * Icon 组件，用于动态渲染不同的图标
 * @param {IconProps} props - 组件的属性对象，包含要渲染图标的名称和其他 LucideProps 属性
 * @returns {JSX.Element} - 渲染指定名称的图标，并传入其他属性
 */
export const Icon = ({ name, className, ...rest }: IconProps) => {
	// 确保 name 是一个有效的键
	if (!(name in icons)) {
		return <icons.Ban className={cn(["inline-block", className])} />;
	}

	// 根据 name 属性获取对应的 LucideIcon 组件
	const LucideIcon = icons[name];

	// 渲染 LucideIcon 组件，并传入其他属性
	return <LucideIcon className={cn(["inline-block", className])} {...rest} />;
};
