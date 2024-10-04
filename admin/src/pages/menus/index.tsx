import { Flex, Icon, Text } from "@/components";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
	MenusControllerGetTreeDataResponse,
	TreeMenuDataDto,
	menusControllerGetTreeData,
} from "@/services";
import { useState, useEffect } from "react";
import {
	DragDropContext,
	Droppable,
	Draggable,
	OnDragEndResponder,
	DraggingStyle,
} from "react-beautiful-dnd";

const Menus = () => {
	const [menuCheck, setMenuChecks] = useState<[string, string]>();

	const [menuTree, setMenuTree] =
		useState<MenusControllerGetTreeDataResponse>();
	const getMenu = async () => {
		const res = await menusControllerGetTreeData();

		setItems(
			res.data?.map((item) => ({
				id: item._id,
				...item,
			})) || []
		);
		setMenuChecks([
			res.data?.[0]?._id || "",
			res.data?.[0].children?.[0]?._id || "",
		]);
		setMenuTree(res.data);
	};

	useEffect(() => {
		getMenu();
	}, []);

	type Item = {
		id: string;
		content: string;
	};

	const [items, setItems] = useState<TreeMenuDataDto[]>([]);

	const reorder = (
		list: TreeMenuDataDto[],
		startIndex: number,
		endIndex: number
	) => {
		const result = Array.from(list);
		const [removed] = result.splice(startIndex, 1);
		result.splice(endIndex, 0, removed);
		return result;
	};

	const onDragEnd: OnDragEndResponder = (result) => {
		// dropped outside the list
		if (!result.destination) {
			return;
		}

		const newItems = reorder(
			items,
			result.source.index,
			result.destination.index
		);

		setItems(newItems);
	};

	return (
		<div className="grid grid-cols-3 gap-4 p-4 h-full">
			<Card className="p-4 pt-0">
				<CardHeader className="px-0 py-2">
					<CardTitle className="w-full">
						<Button variant="ghost" className="w-full" size="lg">
							<Flex items="center" gap={2}>
								<Icon name="Plus" size={18}></Icon>
								添加一级菜单
							</Flex>
						</Button>
					</CardTitle>
				</CardHeader>
				<DragDropContext onDragEnd={onDragEnd}>
					<Droppable
						droppableId="droppable"
						children={(droppableProvided) => (
							<div
								{...droppableProvided.droppableProps}
								ref={droppableProvided.innerRef}
							>
								{items.map((item, index) => (
									<Draggable
										key={item._id}
										draggableId={item._id}
										index={index}
										children={(draggableProvided, snapshot) => (
											<div
												ref={draggableProvided.innerRef}
												{...draggableProvided.draggableProps}
												{...draggableProvided.dragHandleProps}
												style={draggableProvided.draggableProps.style}
												onClick={() => {
													setMenuChecks([
														item._id,
														item.children?.[0]?._id || "",
													]);
												}}
												className={cn([
													"select-none rounded-md p-3 mb-2 border bg-background shadow-sm hover:bg-accent ",
													{
														// "bg-primary text-primary-foreground shadow hover:bg-primary/90 border border-dotted":
														// 	snapshot.isDragging,
														"bg-accent": snapshot.isDragging,
														"bg-primary text-primary-foreground shadow hover:bg-primary/90 border":
															menuCheck?.[0] === item._id,
													},
												])}
											>
												<Flex className="w-full gap-2">
													<Flex vertical flex="1" items="start">
														<Text className="text-left" bold>
															<Flex items="center" gap={2}>
																<Icon name={item.icon as any} size={20} />
																{item.name}
															</Flex>
														</Text>
														<Text type="muted" className="text-left">
															{item.description}
														</Text>
													</Flex>
												</Flex>
											</div>
										)}
									/>
								))}
								{droppableProvided.placeholder}
							</div>
						)}
					/>
				</DragDropContext>
			</Card>
			<div></div>
			<div>3</div>
		</div>
	);
};

export default Menus;
