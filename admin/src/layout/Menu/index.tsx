import { Box, Text } from '~/components';
import styles from './index.module.less'
import { toggleTheme } from '~/utils';
import { ColorEnum } from '~/components/enum';
import { createSignal } from 'solid-js';
const Menu = () => {
  const [theme,setTheme] = createSignal(document.body.getAttribute("theme-mode"))
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
      <Text
        cursor='pointer'
        onClick={() => {
          toggleTheme()
          setTheme(document.body.getAttribute("theme-mode"))
        }}>
        {theme()}
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