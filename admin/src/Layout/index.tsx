import { Button } from "ui/button";
import { Link, Outlet } from "react-router-dom";

const Layout = () => {
	return (
		<div>
			<Button>
				<Link to="/home">home</Link>
			</Button>
			<Button>
				<Link to="/personalCenter">personalCenter</Link>
			</Button>
			<Outlet />
		</div>
	);
};
export default Layout;
