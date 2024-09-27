import Box from '~/components/Box';
import styles from './index.module.less'
import { createSignal } from 'solid-js';
const Menu = () => {
  const [dark, setDark] = createSignal(false);
  return (
    <Box class={styles.nav} radius={8}>
      nav
      <button onclick={() => {
        if (dark()) {
          document.body.setAttribute('theme-mode', 'light')
          setDark(false)
        } else {
          document.body.setAttribute('theme-mode', 'dark')
          setDark(true)
        }
      }}>
        adasssda
      </button>
    </Box >
  )
};

export default Menu;