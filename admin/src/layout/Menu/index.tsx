import { Box, Text } from '~/components';
import styles from './index.module.less'
import { ColorEnum } from '~/components/enum';
import MenuItem from './MenuItem';
const Menu = () => {
  return (
    <Box
      class={styles.nav}
      radius={16}
      bgProps={{
        bgColor: ColorEnum.Bg,
        bgColorLevel: 9
      }}
      contentProps={{ class: styles.content }}
    >
      <MenuItem icon='1' title='title1' />
      <MenuItem icon='2' title='title2' />
      <MenuItem icon='3' title='title3' />
      <MenuItem icon='4' title='title4' />
    </Box >
  )
};

export default Menu;