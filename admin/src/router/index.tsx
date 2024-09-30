import HomePage from "@/pages/home";
import PersonalCenterPage from "@/pages/personalCenter";
import Layout from "@/Layout";
import {
	createBrowserRouter,
	RouteObject,
	useLoaderData,
} from "react-router-dom";

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
];

export default createBrowserRouter(routes);
