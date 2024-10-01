import { cn } from "@/lib/utils";

/**
 * Flex组件的属性类型，基于HTML div元素的属性，并添加了一些自定义属性
 */
export type FlexProps = Pick<React.ComponentProps<"div">, "children"> & {
	/** 水平对齐方式 */
	justify?: "start" | "center" | "end" | "between" | "around" | "normal"; //
	/** 垂直对齐方式 */
	align?: "start" | "center" | "end";
	/** 是否垂直排列 */
	vertical?: boolean;
	/** 是否水平和垂直居中 */
	center?: boolean;
};

/**
 * Flex布局组件，用于灵活布局
 * @param props 组件属性，包括子元素和Flex特有的布局属性
 * @returns 返回一个带有flex布局的div元素，根据传入的属性决定其子元素的对齐和排列方式
 */
export const Flex = (props: FlexProps) => {
	const { center = false } = props; // 是否水平和垂直居中，默认为false
	const {
		justify = center ? "center" : "normal", // 水平对齐方式，默认为"normal"，如果center为true则默认为"center"
		align = center ? "center" : "start", // 垂直对齐方式，默认为"start"，如果center为true则默认为"center"
		vertical,
		children,
	} = props; // 解构出其他属性

	return (
		<div
			className={cn([
				// 动态构建class字符串
				"flex",
				`justify-${justify}`,
				`items-${align}`,
				{
					"flex-col": vertical, // 如果vertical为true，则添加"flex-col"类名
				},
			])}
		>
			{children} // 渲染子元素
		</div>
	);
};
