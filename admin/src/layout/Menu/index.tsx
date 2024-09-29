import { Avatar, Box, Text } from '~/components';
import styles from './index.module.less'
import { ColorEnum, RadiusSizeEnum, SizeEnum } from '~/components/enum';
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
      <div class={styles.logo}>
        logo
      </div>
      <div>
        <MenuItem icon='1' title='title1' />
        <MenuItem icon='2' title='title2' />
        <MenuItem icon='3' title='title3' />
        <MenuItem icon='4' title='title4' />
      </div>
      <div class={styles.user}>
        <Avatar src='' />
      </div>
    </Box >
  )
};

export default Menu;