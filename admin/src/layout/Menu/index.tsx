import { Box, Text } from '~/components';
import styles from './index.module.less'
import { toggleTheme } from '~/utils';
import { ColorEnum } from '~/components/enum';
const Menu = () => {
  return (
    <Box class={styles.nav} radius={16} bgProps={{
      bgColor: ColorEnum.Primary,
      bgColorLevel: 2
    }}>
      <Text
        cursor='pointer'
        onClick={() => {
          toggleTheme()
        }}>
        nav
      </Text>
      <Text
        cursor='pointer'
        color={ColorEnum.Primary}
      >
        Error
      </Text>
      <Text
        cursor='pointer'
        color={ColorEnum.Success}
      >
        Error
      </Text>
      <Text
        cursor='pointer'
        color={ColorEnum.Warning}
      >
        Error
      </Text>
      <Text
        cursor='pointer'
        color={ColorEnum.Error}
      >
        Error
      </Text>
      <Text
        cursor='pointer'
        color={ColorEnum.Link}
      >
        Link
      </Text>
    </Box >
  )
};

export default Menu;