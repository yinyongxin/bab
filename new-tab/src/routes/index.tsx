import { lazy } from "solid-js";
import type { RouteDefinition } from "@solidjs/router";

export const routes: RouteDefinition[] = [
	{
		path: "/",
		component: lazy(() => import("../pages/home")),
	},
	{
		path: "/home",
		component: lazy(() => import("../pages/home")),
	},
	{
		path: "*",
		component: () => <div>404</div>,
	},
];
