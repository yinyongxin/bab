import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { client } from "./services";
import "./index.css";
import { toast } from "./hooks/use-toast.ts";

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
	} else if (response.status >= 400) {
		console.error(
			`request to ${response.url} failed with status ${response.status}`
		);
		toast({
			title: "请求失败: " + response.status,
			description: response.statusText,
			variant: "destructive",
		});
		throw new Error("Request failed");
	}
	return response;
});

createRoot(document.getElementById("root")!).render(<App />);
