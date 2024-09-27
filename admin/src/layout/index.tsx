import { routes } from "~/routes";
import { Router } from '@solidjs/router';
export default function Layout() {
  return (
    <div>
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
    </div>
  );
}
