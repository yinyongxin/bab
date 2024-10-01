import HomePage from "@/pages/home";
import PersonalCenterPage from "@/pages/personalCenter";
import Layout from "@/Layout";
import { createBrowserRouter, RouteObject } from "react-router-dom";
import NotFound from "@/pages/NotFound";

const routes: RouteObject[] = [
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
		],
	},
	{ path: "*", element: <NotFound /> },
];

export default createBrowserRouter(routes);
