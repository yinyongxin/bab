import { Portal } from "solid-js/web";
import styles from "./index.module.less";
import { Component, createSignal, Show } from "solid-js";
export type MenuItemProps = {
	icon: string;
	title: string;
};
const MenuItem: Component<MenuItemProps> = (props) => {

	return (
		<div class={styles.item}>
			<div class={styles.icon}>{props.icon}</div>
		</div>
	);
};

export default MenuItem;
