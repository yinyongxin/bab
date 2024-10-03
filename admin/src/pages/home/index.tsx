import { Button } from "@/components/ui/button";
import { useEffect, useMemo, useState } from "react";
import { icons } from "lucide-react";
import { Flex, Icon } from "@/components";

const Home = () => {
	const [count, setCount] = useState(0);
	useEffect(() => {
		console.log("aasfasf", Object.keys(icons));
	}, []);
	const iconsMemo = useMemo(() => {
		return (
			<Flex gap={2} wrap>
				{Object.keys(icons).map((name) => {
					return <Icon name={name as any} />;
				})}
			</Flex>
		);
	}, []);
	return (
		<div className="flex flex-col h-screen overflow-auto">
			<Button onClick={() => setCount(count + 1)}>
				<span className="text-2xl">{count}</span>
			</Button>
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
			{iconsMemo}
		</div>
	);
};
export default Home;
