import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
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

createRoot(document.getElementById("root")!).render(
	// <StrictMode>
	<App />
	// </StrictMode>,
);
