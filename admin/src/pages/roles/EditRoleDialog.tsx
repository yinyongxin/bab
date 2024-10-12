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
import {
	admintorsControllerFindById,
	admintorsControllerUpdateOne,
	ResultAdmintorDtoSchema,
} from "@/services";
import { toast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const formSchema = z.object({
	username: z.string().min(2, {
		message: "用户名至少需要2个字符。",
	}),
	sex: z.enum(ResultAdmintorDtoSchema.properties.sex.enum),
	name: z
		.string()
		.min(2, {
			message: "名字至少需要2个字符。",
		})
		.or(z.string()),
	phone: z
		.string()
		.min(1, {
			message: "手机号至少需要1位。",
		})
		.max(11, {
			message: "手机号最多11位。",
		})
		.or(z.string()),
	email: z.optional(z.string().email("邮箱格式不正确")).or(z.string()),
});

export type EditRoleDialogProps = {
	success?: () => void;
	children?: React.ReactNode;
	onClose: () => void;
	id?: string;
};

export const EditRoleDialog = (props: EditRoleDialogProps) => {
	const [open, setOpen] = useState(false);

	// 1. Define your form.
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			username: "",
			sex: "Male",
			name: "",
			phone: "",
			email: "",
		},
	});

	const getData = async (id: string) => {
		const res = await admintorsControllerFindById({
			query: { id },
		});
		if (res.data) {
			form.reset({
				username: res.data.username,
				sex: res.data.sex || "Male",
				name: res.data.name || "",
				phone: res.data.phone || "",
				email: res.data.email || "",
			});
		}
	};

	useEffect(() => {
		if (props.id) {
			setOpen(true);
			getData(props.id);
		}
	}, [props.id]);

	// 2. Define a submit handler.
	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		if (!props.id) {
			return;
		}
		await admintorsControllerUpdateOne({
			query: { id: props.id },
			body: values,
		});
		toast({
			title: "通知",
			description: "更新成功",
		});
		props.success?.();
	};

	return (
		<Dialog
			open={open}
			onOpenChange={(val) => {
				if (!val) {
					form.reset({});
					props.onClose();
				}
				setOpen(val);
			}}
		>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>编辑</DialogTitle>
					<DialogDescription>编辑信息，点击保存完成编辑。</DialogDescription>
				</DialogHeader>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
						<FormField
							control={form.control}
							name="username"
							render={({ field }) => (
								<FormItem>
									<FormLabel>用户名</FormLabel>
									<FormControl>
										<Input placeholder="请输入" {...field} />
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
									<FormLabel>姓名</FormLabel>
									<FormControl>
										<Input placeholder="请输入" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="phone"
							render={({ field }) => (
								<FormItem>
									<FormLabel>电话</FormLabel>
									<FormControl>
										<Input placeholder="请输入" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormLabel>邮箱</FormLabel>
									<FormControl>
										<Input type="email" placeholder="请输入" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="sex"
							render={({ field }) => (
								<FormItem>
									<FormLabel>性别</FormLabel>
									<FormControl>
										<RadioGroup
											onValueChange={field.onChange}
											defaultValue={field.value}
											className="flex flex-col space-y-1"
										>
											<FormItem className="flex items-center space-x-3 space-y-0">
												<FormControl>
													<RadioGroupItem value="Male" />
												</FormControl>
												<FormLabel>男</FormLabel>
											</FormItem>
											<FormItem className="flex items-center space-x-3 space-y-0">
												<FormControl>
													<RadioGroupItem value="Female" />
												</FormControl>
												<FormLabel>女</FormLabel>
											</FormItem>
										</RadioGroup>
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
