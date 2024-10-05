import { Button } from "@/components/ui/button";
import { FC, forwardRef, useEffect, useMemo, useState } from "react";
import { icons } from "lucide-react";
import { Flex, Icon } from "@/components";
import { GridComponents, Virtuoso, VirtuosoGrid } from "react-virtuoso";

// The callback is executed often - don't inline complex components in here.
const ItemWrapper: FC<React.HTMLAttributes<HTMLDivElement>> = ({
	children,
	...props
}) => (
	<div
		{...props}
		style={{
			display: "flex",
			flex: 1,
			textAlign: "center",
			padding: "1rem 1rem",
			border: "1px solid gray",
			whiteSpace: "nowrap",
		}}
	>
		{children}
	</div>
);
const Home = () => {
	const [count, setCount] = useState(0);
	useEffect(() => {
		console.log("aasfasf", Object.keys(icons));
	}, []);

	return (
		<div className="flex flex-col justify-center items-center h-screen overflow-auto">
			<Button onClick={() => setCount(count + 1)}>
				<span className="text-2xl">{count}</span>
			</Button>
			<div className="w-full">
				<VirtuosoGrid
					style={{ height: 500 }}
					totalCount={Object.keys(icons).length}
					components={{
						List: forwardRef(({ style, children, ...props }, ref) => (
							<div
								ref={ref}
								{...props}
								style={{
									display: "flex",
									flexWrap: "wrap",
									...style,
								}}
							>
								{children}
							</div>
						)),
						Item: ({ children, ...props }) => (
							<div
								{...props}
								style={{
									padding: "0.5rem",
									display: "flex",
									flex: "none",
									alignContent: "stretch",
									boxSizing: "border-box",
								}}
							>
								{children}
							</div>
						),
					}}
					itemContent={(index) => (
						<ItemWrapper>
							<Icon name={Object.keys(icons)[index] as any} />
						</ItemWrapper>
					)}
				/>
			</div>
			<Flex vertical gap={2}>
				<div className="text-warning-foreground bg-warning">text-warning</div>
				<div className="text-warning bg-warning-foreground">
					text-foreground
				</div>
				<div className="text-primary-foreground bg-primary">text-primary</div>
				<div className="text-primary bg-primary-foreground">
					text-foreground
				</div>
			</Flex>
		</div>
	);
};
export default Home;
