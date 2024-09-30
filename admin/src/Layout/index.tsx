import { Outlet } from "react-router-dom";
import * as Icons from "lucide-react";
import { Button } from "@/components/ui/button";
const Layout = () => {
	return (
		<div
			style={{ display: "grid", gridTemplateColumns: "auto 1fr" }}
			className="h-screen"
		>
			<div>
				<Button></Button>
			</div>
			<main>
				<Outlet />
			</main>
		</div>
	);
};
export default Layout;
