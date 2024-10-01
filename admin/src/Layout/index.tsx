import { Outlet } from "react-router-dom";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";

const Layout = () => {
	return (
		<div
			style={{ display: "grid", gridTemplateColumns: "auto 1fr" }}
			className="h-screen"
		>
			<div>
				<Popover >
					<PopoverTrigger>Open</PopoverTrigger>
					<PopoverContent align="end" side="right">Place content for the popover here.</PopoverContent>
					
				</Popover>
			</div>
			<main>
				<Outlet />
			</main>
		</div>
	);
};
export default Layout;
