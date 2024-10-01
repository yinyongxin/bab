import { Avatar, Box, Text } from "~/components";
import styles from "./index.module.less";
import { ColorEnum, RadiusSizeEnum, SizeEnum } from "~/components/enum";
import MenuItem from "./MenuItem";
import { Flex, FlexItem } from "~/components/Flex";
import { createSignal, Show } from "solid-js";
const Menu = () => {
	const [isHover, setIsHover] = createSignal(false);
	return (
		<Box
			class={styles.nav}
			radius={16}
			bgProps={{
				bgColor: ColorEnum.Bg,
				bgColorLevel: 9,
			}}
			contentProps={{ class: styles.navContent }}
		>
			<Flex direction="column" justify="space-between" height="100%" gap="16px">
				<div class={styles.logo}>logo</div>
				<FlexItem flex={1}>
					<Flex gap="12px" direction="column">
						<MenuItem icon="1" title="title1" />
						<MenuItem icon="2" title="title2" />
						<MenuItem icon="3" title="title3" />
						<MenuItem icon="4" title="title4" />
					</Flex>
				</FlexItem>
				<div class={styles.user}>
					<Avatar src="" onClick={() => setIsHover(!isHover())} />
					<Show when={isHover()}>
						<div class={styles.content}>CacaCSCCS</div>
					</Show>
				</div>
			</Flex>
		</Box>
	);
};

export default Menu;
