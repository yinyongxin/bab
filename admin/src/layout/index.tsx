import { routes } from "~/routes";
import { Router } from '@solidjs/router';
import Menu from "./Menu";
import styles from './index.module.less'
const Layout = () => {
  return (
    <div class={styles.layout}>
      <Menu />
      <main class={styles.main}>
        <Router>
          {routes}
        </Router>
      </main>
    </div>
  );
}

export default Layout