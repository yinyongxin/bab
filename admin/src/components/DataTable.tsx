import {
	ColumnDef,
	flexRender,
	getCoreRowModel,
	getPaginationRowModel,
	PaginationState,
	useReactTable,
} from "@tanstack/react-table";

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "./ui/pagination";
import { useEffect, useImperativeHandle, useState } from "react";
import { Icon } from "./Icon";

export type DataTableActionRef = {
	refresh: (options?: { showLoading?: boolean }) => void;
};

interface DataTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[];
	getData?: (pagination: PaginationState) => Promise<
		PaginationState & {
			total: number;
			list: Array<TData>;
		}
	>;
	border?: boolean;
	showLoading?: boolean;
	actionRef?: React.RefObject<DataTableActionRef>;
}

export const DataTable = <TData, TValue>(
	props: DataTableProps<TData, TValue>
) => {
	const { columns, border = false, showLoading = true, getData } = props;
	const [loading, setLoading] = useState(true);
	const [pagination, setPagination] = useState({
		pageIndex: 0, //initial page index
		pageSize: 10, //default page size
	});
	const [rowCount, setRowCount] = useState(0);
	const [data, setData] = useState<TData[]>([]);
	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		manualPagination: true,
		rowCount,
		state: {
			pagination,
		},
		onPaginationChange: setPagination,
		getPaginationRowModel: getPaginationRowModel(),
	});

	const getDataFn = async (options: { showLoading: boolean }) => {
		try {
			if (options.showLoading) {
				setLoading(true);
			}
			const res = await getData?.(pagination);
			setData(
				res?.list?.map((item) => {
					return {
						// @ts-ignore
						id: item?._id,
						...item,
					};
				}) || []
			);
			setRowCount(res?.total || 0);
		} catch {
			setData([]);
			setRowCount(0);
		} finally {
			if (showLoading) {
				setLoading(false);
			}
		}
	};

	useEffect(() => {
		getDataFn({ showLoading: showLoading });
	}, [pagination.pageIndex, pagination.pageSize]);

	const paginationRender = () => {
		const pageCount = table.getPageCount();
		const showEllipsis = pageCount > 5;
		return (
			<div className="flex items-center justify-end pt-4">
				<Pagination>
					<PaginationContent>
						<PaginationItem>
							<PaginationPrevious
								disabled={!table.getCanPreviousPage()}
								onClick={() => table.previousPage()}
							/>
						</PaginationItem>
						<PaginationItem key={Math.random()}>
							<PaginationLink
								onClick={() => table.setPageIndex(0)}
								isActive={0 === pagination.pageIndex}
							>
								{1}
							</PaginationLink>
						</PaginationItem>
						{showEllipsis && pagination.pageIndex > 4 && (
							<PaginationItem>
								<PaginationEllipsis />
							</PaginationItem>
						)}
						{/* 遍历页码数组，为每一页生成相应的页码项 */}
						{Array.from({ length: pageCount }).map((_, index) => {
							// 判断是否为第一页
							const isFirstPage = index === 0;
							// 判断是否为最后一页
							const isLastPage = index === pageCount - 1;
							// 跳过第一页和最后一页，不生成页码项
							if (isFirstPage || isLastPage) {
								return null;
							}
							// 如果显示省略号，则根据当前页码位置决定是否生成页码项
							if (showEllipsis) {
								// 如果当前页码远大于4，并且索引小于当前页码前两位，则跳过这些页码项
								if (
									pagination.pageIndex > 4 &&
									index < pagination.pageIndex - 2
								) {
									return null;
								}
								// 如果当前页码远小于总页数减5，并且索引大于当前页码后两位，则跳过这些页码项
								if (
									pagination.pageIndex < pageCount - 5 &&
									index > pagination.pageIndex + 2
								) {
									return null;
								}
							}
							// 生成页码项，每个页码项都有一个随机的关键字，点击可以跳转到相应的页码
							return (
								<PaginationItem key={Math.random()}>
									<PaginationLink
										onClick={() => table.setPageIndex(index)}
										isActive={index === pagination.pageIndex}
									>
										{index + 1}
									</PaginationLink>
								</PaginationItem>
							);
						})}
						{showEllipsis && pagination.pageIndex < pageCount - 5 && (
							<PaginationItem>
								<PaginationEllipsis />
							</PaginationItem>
						)}
						{pageCount > 1 && (
							<PaginationItem key={Math.random()}>
								<PaginationLink
									onClick={() => table.setPageIndex(pageCount - 1)}
									isActive={pageCount - 1 === pagination.pageIndex}
								>
									{pageCount}
								</PaginationLink>
							</PaginationItem>
						)}
						<PaginationItem>
							<PaginationNext
								onClick={() => table.nextPage()}
								disabled={!table.getCanNextPage()}
							/>
						</PaginationItem>
					</PaginationContent>
				</Pagination>
			</div>
		);
	};

	useImperativeHandle(props.actionRef, () => ({
		refresh: (options?: { showLoading?: boolean }) => {
			getDataFn({
				showLoading:
					options?.showLoading !== undefined
						? options?.showLoading
						: showLoading,
			});
		},
	}));

	return (
		<div>
			<div
				className={cn([
					{
						border: border,
						"rounded-md": border,
						"p-4": border,
					},
				])}
			>
				<Table>
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => {
									return (
										<TableHead key={header.id}>
											{header.isPlaceholder
												? null
												: flexRender(
														header.column.columnDef.header,
														header.getContext()
												  )}
										</TableHead>
									);
								})}
							</TableRow>
						))}
					</TableHeader>
					<TableBody className="relative">
						{table.getRowModel().rows?.length ? (
							table.getRowModel().rows.map((row) => {
								return (
									<TableRow
										key={row.id}
										data-state={row.getIsSelected() && "selected"}
									>
										{row.getVisibleCells().map((cell) => (
											<TableCell key={cell.id}>
												{flexRender(
													cell.column.columnDef.cell,
													cell.getContext()
												)}
											</TableCell>
										))}
									</TableRow>
								);
							})
						) : (
							<TableRow>
								<TableCell
									colSpan={columns.length}
									className="h-24 text-center"
								>
									No results.
								</TableCell>
							</TableRow>
						)}
						{loading && (
							<TableRow className="flex items-center justify-center h-full absolute top-0 left-0 right-0 bottom-0 bg-secondary/90 hover:bg-secondary/90 transition-all duration-300">
								<TableCell colSpan={columns.length} className="animate-spin">
									<Icon name="Loader" />
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>
			{paginationRender()}
		</div>
	);
};
