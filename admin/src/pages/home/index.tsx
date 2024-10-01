import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { icons } from "lucide-react";
import { Icon } from "@/components";

const Home = () => {
	const [count, setCount] = useState(0);
	useEffect(() => {
		console.log("aasfasf", Object.keys(icons));
	}, []);
	return (
		<div className="flex flex-col items-center justify-center h-screen">
			<Button onClick={() => setCount(count + 1)}>
				<Icon name="ascasc"></Icon>
				<span className="text-2xl">{count}</span>
			</Button>
		</div>
	);
};
export default Home;
