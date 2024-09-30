import { Button } from "@/components/ui/button";
import { useState } from "react";

const HomePage = () => {
	const [count, setCount] = useState(0);
	return (
		<div className="flex flex-col items-center justify-center h-screen">
			<Button onClick={() => setCount(count + 1)}>
				<span className="text-2xl">{count}</span>
			</Button>
		</div>
	);
};
export default HomePage;
