import {
	DragDropContext,
	Draggable,
	DraggableProvided,
	DraggableStateSnapshot,
	Droppable,
	OnDragEndResponder,
} from "@hello-pangea/dnd";
export type VarticalDragDropProps<D> = {
	draggableItem: (options: {
		data: D;
		draggableProvided: DraggableProvided;
		draggableStateSnapshot: DraggableStateSnapshot;
	}) => React.ReactNode;
	list: D[];
	uniqueKey: keyof D;
	onDragEnd: (list: D[]) => void;
};
/**
 * https://github.com/hello-pangea/dnd
 */
function VarticalDragDrop<D>(props: VarticalDragDropProps<D>) {
	const { draggableItem, list, uniqueKey, onDragEnd: onDragEndProps } = props;
	const reorder = (list: any[], startIndex: number, endIndex: number) => {
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
			list,
			result.source.index,
			result.destination.index
		);
		onDragEndProps(newItems);
	};
	return (
		<DragDropContext onDragEnd={onDragEnd}>
			<Droppable droppableId="droppable">
				{(droppableProvided) => (
					<div
						{...droppableProvided.droppableProps}
						ref={droppableProvided.innerRef}
					>
						{list.map((item, index) => (
							<Draggable
								key={item[uniqueKey] as string}
								draggableId={item[uniqueKey] as string}
								index={index}
							>
								{(draggableProvided, draggableStateSnapshot) => (
									<div
										ref={draggableProvided.innerRef}
										{...draggableProvided.draggableProps}
										{...draggableProvided.dragHandleProps}
										style={draggableProvided.draggableProps.style}
										className="mb-2"
									>
										{draggableItem({
											data: item,
											draggableProvided,
											draggableStateSnapshot,
										})}
									</div>
								)}
							</Draggable>
						))}
						{droppableProvided.placeholder}
					</div>
				)}
			</Droppable>
		</DragDropContext>
	);
}

export default VarticalDragDrop;
