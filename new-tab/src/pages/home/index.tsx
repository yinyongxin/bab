import styles from "./index.module.less";
import { ColorEnum } from "~/components/enum";
import { Text } from "~/components";
import { toggleTheme } from "~/utils";
import { Portal } from "solid-js/web";

export default function Home() {
	return (
		<main class={styles.home}>
			<Text cursor="pointer" color={ColorEnum.Primary}>
				Error
			</Text>
			<Text cursor="pointer" color={ColorEnum.Success}>
				Error
			</Text>
			<Text cursor="pointer" color={ColorEnum.Warning}>
				Error
			</Text>
			<Text cursor="pointer" color={ColorEnum.Error}>
				Error
			</Text>
			<Text
				cursor="pointer"
				color={ColorEnum.Link}
				onClick={() => {
					toggleTheme();
				}}
			>
				Link
			</Text>
		</main>
	);
}
