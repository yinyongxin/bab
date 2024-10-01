import HomePage from "@/pages/home";
import PersonalCenterPage from "@/pages/personalCenter";
import Layout from "@/Layout";
import { createBrowserRouter, RouteObject } from "react-router-dom";
import NotFound from "@/pages/notFound";
import { Login } from "@/pages/login";
import Setting from "@/pages/setting";

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
			{ path: "/*", element: <NotFound /> },
		],
	},

	{ path: "/login", element: <Login /> },
	{ path: "*", element: <NotFound /> },
];

export default createBrowserRouter(routes);
