import { Component, JSX } from "solid-js";

// 导出FlexItem组件
export * from "./FlexItem";

// 定义FlexProps类型，这些属性用于控制Flex容器的布局
export type FlexProps = {
	justify?: JSX.CSSProperties["justify-content"]; // 水平对齐方式
	align?: JSX.CSSProperties["align-items"]; // 垂直对齐方式
	direction?: JSX.CSSProperties["flex-direction"]; // 弹性盒子方向
	gap?: JSX.CSSProperties["gap"]; // 项目间距
	height?: JSX.CSSProperties["height"]; // 高度
	width?: JSX.CSSProperties["width"]; // 宽度
	children: JSX.Element; // Flex容器中的子元素
};

// Flex组件是一个函数式组件，用于创建一个弹性盒子布局的容器
export const Flex: Component<FlexProps> = (props) => {
	// 返回一个div元素，使用flex显示模式，并根据传入的props设置不同的布局属性
	return (
		<div
			style={{
				display: "flex",
				"justify-content": props?.justify || "flex-start", // 水平对齐，默认为flex-start
				"align-items": props?.align || "unset", // 垂直对齐，默认为unset
				"flex-direction": props?.direction || "row", // 弹性盒子方向，默认为row
				gap: props?.gap || "0px", // 项目间距，默认为0px
				height: props?.height || "unset", // 高度，默认为unset
				width: props?.width || "unset", // 宽度，默认为unset
			}}
		>
			{/* 渲染子元素 */}
			{props.children}
		</div>
	);
};
