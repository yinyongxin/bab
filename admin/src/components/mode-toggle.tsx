import { Moon, Sun } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Theme, useTheme } from "@/components/theme-provider";
import { Icon } from "./icon";

export type ModeToggleProps = {
	single?: boolean;
};
export function ModeToggle(props: ModeToggleProps) {
	const { single } = props;
	const { theme, setTheme } = useTheme();
	if (single) {
		const themeIcons: Record<Theme, JSX.Element> = {
			dark: <Icon name="Moon" />,
			light: <Icon name="Sun" />,
			system: <Icon name="MonitorCog" />,
		};
		return (
			<Button
				variant="ghost"
				size="icon"
				className="h-10 w-10"
				onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
			>
				{themeIcons[theme]}
			</Button>
		);
	}

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" size="icon" className="h-10 w-10">
					<Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
					<Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
					<span className="sr-only">Toggle theme</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent side="right" className="ml-6">
				<DropdownMenuItem onClick={() => setTheme("light")}>
					Light
				</DropdownMenuItem>
				<DropdownMenuItem onClick={() => setTheme("dark")}>
					Dark
				</DropdownMenuItem>
				<DropdownMenuItem onClick={() => setTheme("system")}>
					System
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
