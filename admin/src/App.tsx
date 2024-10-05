import { RouterProvider } from "react-router-dom";
import router from "./router";
import { ThemeProvider } from "./components/theme-provider";
import { Toaster } from "./components/ui/toaster";

function App() {
	return (
		<ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
			<RouterProvider
				router={router}
				fallbackElement={<p>Loading...</p>}
				future={{
					v7_startTransition: true,
				}}
			/>
			<Toaster />
		</ThemeProvider>
	);
}

export default App;
