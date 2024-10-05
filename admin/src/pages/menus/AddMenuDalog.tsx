import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { menusControllerAddOne } from "@/services";
import { toast } from "@/hooks/use-toast";
import { useState } from "react";

export type AddMenuDalogProps = {
	success?: () => void;
	children?: React.ReactNode;
	parentId?: string;
};

export const AddMenuDalog = (props: AddMenuDalogProps) => {
	const { parentId = "" } = props;

	const [open, setOpen] = useState(false);

	const formSchema = z.object({
		name: z.string().min(2, {
			message: "用户名至少需要2个字符。",
		}),
		description: z.string().min(6, {
			message: "描述至少需要6个字符。",
		}),
		path: z.string().min(parentId ? 1 : 0, {
			message: "描述至少需要1个字符。",
		}),
	});

	const defaultValues = {
		name: "",
		description: "",
		path: "",
		icon: "",
		parent: parentId,
	};

	// 1. Define your form.
	const form = useForm<typeof defaultValues>({
		resolver: zodResolver(formSchema),
		defaultValues,
	});

	// 2. Define a submit handler.
	const onSubmit = async (values: typeof defaultValues) => {
		const res = await menusControllerAddOne({ body: values });
		console.log(res);
		toast({
			title: "通知",
			description: "创建成功",
		});
		props.success?.();
		setOpen(false);
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger
				asChild
				onClick={() => {
					form.reset(defaultValues);
					setOpen(true);
				}}
			>
				{props.children}
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>添加一级菜单</DialogTitle>
					<DialogDescription>
						输入菜单信息，点击保存完成创建。
					</DialogDescription>
				</DialogHeader>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>菜单名称</FormLabel>
									<FormControl>
										<Input placeholder="请输入" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="description"
							render={({ field }) => (
								<FormItem>
									<FormLabel>描述</FormLabel>
									<FormControl>
										<Input placeholder="请输入" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="path"
							render={({ field }) => (
								<FormItem>
									<FormLabel>路径地址</FormLabel>
									<FormControl>
										<Input placeholder="请输入" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<DialogFooter>
							<Button type="submit">保存</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
};
