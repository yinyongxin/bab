import { Avatar, Box, Text } from "~/components";
import styles from "./index.module.less";
import { ColorEnum, RadiusSizeEnum, SizeEnum } from "~/components/enum";
import MenuItem from "./MenuItem";
import { Flex, FlexItem } from "~/components/Flex";
const Menu = () => {
	return (
		<Box
			class={styles.nav}
			radius={16}
			bgProps={{
				bgColor: ColorEnum.Bg,
				bgColorLevel: 9,
			}}
			contentProps={{ class: styles.content }}
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
					<Avatar src="" />
				</div>
			</Flex>
		</Box>
	);
};

export default Menu;
