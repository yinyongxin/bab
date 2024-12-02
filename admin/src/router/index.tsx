import PersonalCenterPage from "@/pages/personal-center";
import Layout from "@/Layout";
import { createBrowserRouter, RouteObject } from "react-router-dom";
import Login from "@/pages/login";
import NotFound from "@/pages/not-found";
import Setting from "@/pages/setting";
import Admintors from "@/pages/admintors";
import Menus from "@/pages/menus";
import { lazy } from "react";

const Home = lazy(() => import("@/pages/home"));

const Roles = lazy(() => import("@/pages/roles"));

export const routes: RouteObject[] = [
	{
		path: "/",
		element: <Layout />,

		children: [
			{
				path: "home",
				element: <Home />,
			},
			{
				path: "roles",
				element: <Roles />,
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
