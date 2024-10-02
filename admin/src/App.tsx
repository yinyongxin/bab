import { RouterProvider } from "react-router-dom";
import router from "./router";
import { ThemeProvider } from "./components/theme-provider";

function App() {
	return (
		<ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
			<RouterProvider
				router={router}
				fallbackElement={<p>Loading...</p>}
				future={{
					v7_startTransition: true,
				}}
			/>
		</ThemeProvider>
	);
}

export default App;
