import { Outlet } from "react-router-dom";
import MenuNavBar from "./MenuNavBar";

const Layout = () => {
	return (
		<div
			style={{ display: "grid", gridTemplateColumns: "auto 1fr" }}
			className="h-screen"
		>
			<MenuNavBar />
			<main>
				<Outlet />
			</main>
		</div>
	);
};
export default Layout;
