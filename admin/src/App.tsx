import { RouterProvider } from "react-router-dom";
import router from "./router";
import { client } from "./services";

// configure internal service client
client.setConfig({
	// set default base url for requests
	baseUrl: "http://localhost:3000",
	// set default headers for requests
	headers: {
		Authorization: `Bearer ${localStorage.getItem("token")}`,
	},
});

client.interceptors.response.use((response) => {
	if (response.status === 200) {
		console.log(`request to ${response.url} was successful`);
	}
	return response;
});

function App() {
	return (
		<RouterProvider
			router={router}
			fallbackElement={<p>Loading...</p>}
			future={{
				v7_startTransition: true,
			}}
		/>
	);
}

export default App;
