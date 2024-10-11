import { Icon } from "@/components";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function NotFound() {
	return (
		<>
			<main className="grid h-full place-items-center  px-6 py-24 sm:py-32 lg:px-8">
				<div className="text-center">
					<p className="font-semibold text-6xl">404</p>
					<h1 className="mt-4 text-3xl font-bold tracking-tight  sm:text-5xl">
						找不到页面
					</h1>
					<p className="mt-6 text-base leading-7 ">
						很抱歉，我们找不到您要查找的页面。
					</p>
					<div className="mt-10 flex items-center justify-center gap-x-6">
						<Button>
							<Link to="/home">回到首页</Link>
						</Button>
						<a href="#" className="text-sm font-semibold  flex items-center">
							联系支持 <Icon name="MoveRight"></Icon>
						</a>
					</div>
				</div>
			</main>
		</>
	);
}
