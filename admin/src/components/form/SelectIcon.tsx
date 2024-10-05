import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/components/ui/command";
import { FormControl, FormItem, FormMessage } from "@/components/ui/form";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { icons } from "lucide-react";

const iconsOptions = Object.keys(icons).map((key) => ({
	label: key,
	value: key,
})) as { label: keyof typeof icons; value: keyof typeof icons }[];

export type SelectIconProps = {
	value: string;
	onSelect: (value: string) => void;
	label?: React.ReactNode;
	description?: React.ReactNode;
};
export function SelectIcon(props: SelectIconProps) {
	const { value, onSelect, label, description } = props;

	return (
		<FormItem className="flex flex-col">
			{label}
			<Popover>
				<PopoverTrigger asChild>
					<FormControl>
						<Button
							variant="outline"
							role="combobox"
							className={cn(
								"w-[200px] justify-between",
								!value && "text-muted-foreground"
							)}
						>
							{value
								? iconsOptions.find((icon) => icon.value === value)?.label
								: "选择图标"}
							<CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
						</Button>
					</FormControl>
				</PopoverTrigger>
				<PopoverContent className="w-[200px] p-0 select-none">
					<Command>
						<CommandInput placeholder="搜索图标" className="h-9" />
						<CommandList>
							<CommandEmpty>No framework found.</CommandEmpty>
							<CommandGroup>
								{iconsOptions.map((icon, index) => {
									return (
										<CommandItem
											value={icon.label}
											key={icon.value}
											onSelect={() => {
												onSelect(icon.value);
											}}
											style={{ display: index > 10 ? "none" : "" }}
										>
											{icon.label}
											<CheckIcon
												className={cn(
													"ml-auto h-4 w-4",
													icon.value === value ? "opacity-100" : "opacity-0"
												)}
											/>
										</CommandItem>
									);
								})}
							</CommandGroup>
						</CommandList>
					</Command>
				</PopoverContent>
			</Popover>
			{description}
			<FormMessage />
		</FormItem>
	);
}
