// 导入必要的依赖库
import { Component, JSX, mergeProps } from "solid-js";
import styles from "./index.module.less";
import { RadiusSizeEnum, SizeEnum } from "../enum";

// 定义头像组件的属性类型
export type AvatarProps = Pick<
	JSX.HTMLAttributes<HTMLDivElement>,
	"onClick"
> & {
	src: string; // 头像的图片链接
	size?: SizeEnum; // 头像的大小，可选
	radius?: RadiusSizeEnum; // 头像的圆角大小，可选
};

// 头像组件
export const Avatar: Component<AvatarProps> = (props) => {
	// 合并默认属性与传入的属性
	const merge = mergeProps(
		{
			radius: RadiusSizeEnum.Default, // 默认的圆角大小
			size: SizeEnum.Default, // 默认的头像大小
		},
		props
	);

	// 返回头像的DOM结构
	return (
		<div
			class={styles.avatar}
			onClick={merge.onClick}
			style={{
				"border-radius": `var( --border-radius-${merge.radius})`, // 设置圆角大小
				width: `var(--size-${merge.size})`, // 设置宽度
				height: `var(--size-${merge.size})`, // 设置高度
			}}
		>
			<img
				src={props.src}
				//  加载头像图片，错误时使用默认头像
				onError={(e) =>
					(e.currentTarget.src =
						"https://avatars.githubusercontent.com/u/10290406?v=4")
				}
			/>
		</div>
	);
};
