import HomePage from "@/pages/home";
import PersonalCenterPage from "@/pages/personalCenter";
import Layout from "@/Layout";
import { createBrowserRouter, RouteObject } from "react-router-dom";
import Login from "@/pages/login";
import NotFound from "@/pages/notFound";
import Setting from "@/pages/setting";
import Admintors from "@/pages/admintors";
import Menus from "@/pages/menus";

export const routes: RouteObject[] = [
	{
		path: "/",
		element: <Layout />,

		children: [
			{
				path: "home",
				element: <HomePage />,
			},
			{
				path: "personalCenter",
				element: <PersonalCenterPage />,
			},
			{
				path: "setting",
				element: <Setting />,
			},
			{ path: "admintors", element: <Admintors /> },
			{ path: "menus", element: <Menus /> },
			{ path: "/*", element: <NotFound /> },
		],
	},

	{ path: "/login", element: <Login /> },
	{ path: "*", element: <NotFound /> },
];

export default createBrowserRouter(routes);
