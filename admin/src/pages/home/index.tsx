import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { icons } from "lucide-react";

const Home = () => {
	const [count, setCount] = useState(0);
	useEffect(() => {
		console.log("aasfasf", Object.keys(icons));
	}, []);
	return (
		<div className="flex flex-col items-center justify-center h-screen">
			<div className="bg-blue-500">
				<div className="text-primary">text-primary</div>
				<div className="text-primary-foreground">text-primary-foreground</div>
				
				<div className="bg-background">bg-background</div>
				<div className="text-background">text-background</div>
				<div className="bg-foreground">bg-foreground</div>
				<div className="text-foreground">text-foreground</div>
			</div>
			<Button onClick={() => setCount(count + 1)}>
				<span className="text-2xl">{count}</span>
			</Button>
		</div>
	);
};
export default Home;
