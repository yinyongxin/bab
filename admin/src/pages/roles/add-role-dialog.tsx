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
import { rolesControllerAddOne } from "@/services";
import { toast } from "@/hooks/use-toast";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
	name: z.string().min(1, {
		message: "用户名至少需要1个字符。",
	}),
	description: z.string().min(1, {
		message: "描述至少需要1个字符。",
	}),
	icon: z.string().min(1, {
		message: "图标至少需要1个字符。",
	}),
});

export type AddRoleDialogProps = {
	success?: () => void;
	children?: React.ReactNode;
};

export const AddRoleDialog = (props: AddRoleDialogProps) => {
	const [open, setOpen] = useState(false);

	// 1. Define your form.
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: "",
			icon: "",
			description: "",
		},
	});

	form.watch((val) => {
		console.log('yyxLog-val', val);
	})

	// 2. Define a submit handler.
	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		const res = await rolesControllerAddOne({ body: values });
		console.log(res);
		toast({
			title: "通知",
			description: "创建成功",
		});
		props.success?.();
		setOpen(false);
	};

	return (
		<Dialog
			open={open}
			onOpenChange={(val) => {
				if (!val) {
					form.reset();
				}
				setOpen(val);
			}}
		>
			<DialogTrigger asChild onClick={() => setOpen(true)}>
				{props.children}
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>添加角色</DialogTitle>
					<DialogDescription>
						输入角色信息，点击保存完成创建。
					</DialogDescription>
				</DialogHeader>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
						<FormField
							control={form.control}
							name="icon"
							render={({ field }) => (
								<FormItem>
									<FormLabel>角色名称</FormLabel>
									<FormControl>
										<Input type="file" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>角色名称</FormLabel>
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
										<Textarea placeholder="请输入" {...field} />
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
