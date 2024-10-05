import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
	base: "./",
	plugins: [react()],
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
			ui: path.resolve(__dirname, "./src/components/ui"),
		},
	},
	build: {
		rollupOptions: {
			output: {
				manualChunks: {
					react: ["react", "react-dom"],
					"react-router-dom": ["react-router-dom"],
					radash: ["radash"],
					dayjs: ["dayjs"],
					"lucide-react": ["lucide-react"],
					"@hello-pangea/dnd": ["@hello-pangea/dnd"],
					"react-virtuoso": ["react-virtuoso"],
					"@uidotdev/usehooks": ["@uidotdev/usehooks"],
				},
			},
		},
	},
});
