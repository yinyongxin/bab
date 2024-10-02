import {
	HoverCard,
	HoverCardContent,
	HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useRef, useState } from "react";

/**
 * UserInfo组件用于显示用户信息卡片，当鼠标悬停在用户头像上时，会显示详细信息
 * 该组件演示了如何使用HoverCard组件来实现鼠标悬停显示详细信息的功能
 *
 * @returns 返回一个HoverCard组件，包含用户头像和悬停时显示的用户详细信息
 */
const UserInfo = () => {
	// 管理HoverCard的打开状态
	const [open, setOpen] = useState(false);
	// 用于存储延迟操作的引用
	const ref = useRef<{
		time: NodeJS.Timeout | null;
	}>({
		time: null,
	});

	return (
		<HoverCard open={open}>
			<HoverCardTrigger
				onMouseEnter={() => {
					// 当鼠标进入头像区域时，如果存在延迟操作则清除，并打开详细信息
					if (ref.current.time) {
						clearTimeout(ref.current.time);
					}
					setOpen(true);
				}}
				onMouseLeave={() => {
					// 当鼠标离开头像区域时，设置一个延迟操作，以关闭详细信息
					ref.current.time = setTimeout(() => {
						setOpen(false);
					}, 200);
				}}
			>
				<Avatar>
					<AvatarImage src="https://github.com/shadcn.png" />
					<AvatarFallback>CN</AvatarFallback>
				</Avatar>
			</HoverCardTrigger>
			<HoverCardContent
				onMouseEnter={() => {
					// 当鼠标进入详细信息区域时，如果存在延迟操作则清除，以保持详细信息显示
					if (ref.current.time) {
						clearTimeout(ref.current.time);
					}
				}}
				onMouseLeave={() => {
					// 当鼠标离开详细信息区域时，设置一个延迟操作，以关闭详细信息
					ref.current.time = setTimeout(() => {
						setOpen(false);
					}, 200);
				}}
				side="right"
				align="end"
				className="ml-6 -mb-4"
			>
				HoverCardContent
			</HoverCardContent>
		</HoverCard>
	);
};

export default UserInfo;
