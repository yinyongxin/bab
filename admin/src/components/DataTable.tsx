import {
	ColumnDef,
	flexRender,
	getCoreRowModel,
	getPaginationRowModel,
	PaginationState,
	useReactTable,
} from "@tanstack/react-table";
import { list } from "radash";
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
import { Card } from "./ui/card";

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

	/**
	 * 生成并渲染分页组件
	 * 此函数用于动态生成分页组件，根据当前表格的页数决定是否显示省略号
	 */
	const paginationRender = () => {
		// 获取当前表格的页数
		const pageCount = table.getPageCount();
		// 当表格页数超过5页时，显示省略号
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
						<PaginationItem>
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
						{list(
							pagination.pageIndex > 4 ? pagination.pageIndex - 2 : 1,
							pagination.pageIndex < pageCount - 4
								? pagination.pageIndex + 2
								: pageCount - 2
						).map((pageIndex) => (
							<PaginationItem key={Math.random()}>
								<PaginationLink
									onClick={() => table.setPageIndex(pageIndex)}
									isActive={pageIndex === pagination.pageIndex}
								>
									{pageIndex + 1}
								</PaginationLink>
							</PaginationItem>
						))}
						{showEllipsis && pagination.pageIndex < pageCount - 4 && (
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
			<Card
				className={cn([
					{
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
			</Card>
			{paginationRender()}
		</div>
	);
};
