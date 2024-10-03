import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { icons } from "lucide-react";
import { Flex } from "@/components";

const Home = () => {
	const [count, setCount] = useState(0);
	useEffect(() => {
		console.log("aasfasf", Object.keys(icons));
	}, []);
	return (
		<div className="flex flex-col items-center justify-center h-screen">
			<Flex vertical gap={2}>
				<div className="text-warning-foreground bg-warning">text-warning</div>
				<div className="text-warning bg-warning-foreground">
					text-foreground
				</div>
			</Flex>
			<Button onClick={() => setCount(count + 1)}>
				<span className="text-2xl">{count}</span>
			</Button>
		</div>
	);
};
export default Home;
