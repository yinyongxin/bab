import { Outlet } from "react-router-dom";
import MenuNavBar from "./MenuNavBar";
import { StrictMode } from "react";

const Layout = () => {
	return (
		<StrictMode>
			<div
				style={{ display: "grid", gridTemplateColumns: "auto 1fr" }}
				className="h-screen"
			>
				<MenuNavBar />
				<main>
					<Outlet />
				</main>
			</div>
		</StrictMode>
	);
};
export default Layout;
