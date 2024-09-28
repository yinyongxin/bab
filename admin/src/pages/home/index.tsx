import styles from "./index.module.less";
import { ColorEnum } from "~/components/enum";
import { Text } from "~/components";
import { toggleTheme } from "~/utils";

export default function Home() {
  return (
    <main class={styles.home}>
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
    </main>
  );
}
