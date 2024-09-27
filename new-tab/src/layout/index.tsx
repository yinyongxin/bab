import { routes } from "~/routes";
import { Router } from '@solidjs/router';
export default function Layout() {
  return (
    <>
      <header>
        header
      </header>
      <main>
        <Router>
          {routes}

        </Router>
      </main>
      <footer>
        footer
      </footer>
    </>
  );
}
