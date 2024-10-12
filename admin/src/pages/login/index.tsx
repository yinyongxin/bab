import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";

export const description =
	"一个带有两列的登录页面。第一列包含电子邮件和密码的登录表单。有一个忘记密码的链接和一个注册链接（如果您还没有账户）。第二列有一张封面图片。";

export default function Login() {
	return (
		<div className="w-full h-screen lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
			<div className="flex items-center justify-center py-12">
				<div className="mx-auto grid w-[350px] gap-6">
					<div className="grid gap-2 text-center">
						<h1 className="text-3xl font-bold">登录</h1>
						<p className="text-balance text-muted-foreground">
							请输入您的电子邮件以登录账户
						</p>
					</div>
					<div className="grid gap-4">
						<div className="grid gap-2">
							<Label htmlFor="email">电子邮件</Label>
							<Input
								id="email"
								type="email"
								placeholder="m@example.com"
								required
							/>
						</div>
						<div className="grid gap-2">
							<div className="flex items-center">
								<Label htmlFor="password">密码</Label>
								<Link
									to="/forgot-password"
									className="ml-auto inline-block text-sm underline"
								>
									忘记密码？
								</Link>
							</div>
							<Input id="password" type="password" required />
						</div>
						<Button type="submit" className="w-full">
							登录
						</Button>
						<Button variant="outline" className="w-full">
							使用谷歌登录
						</Button>
					</div>
					<div className="mt-4 text-center text-sm">
						还没有账户？{" "}
						<Link to="#" className="underline">
							注册
						</Link>
					</div>
				</div>
			</div>
			<div className="hidden bg-muted lg:block h-full overflow-hidden">
				<img
					className="w-full object-cover "
					src="https://images.unsplash.com/photo-1535025183041-0991a977e25b?w=300&dpr=2&q=80"
					alt="一张风景照片，由 Tobias Tullius 拍摄"
				/>
			</div>
		</div>
	);
}
