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
import { useEffect, useState } from "react";
import { Icon } from "./Icon";

interface DataTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[];
	// data: TData[];
	getData?: (pagination: PaginationState) => Promise<
		PaginationState & {
			total: number;
			list: Array<TData>;
		}
	>;
	border?: boolean;
}

export const DataTable = <TData, TValue>(
	props: DataTableProps<TData, TValue>
) => {
	const { columns, border = false, getData } = props;
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

	const getDataFn = async () => {
		try {
			setLoading(true);
			const res = await getData?.(pagination);
			setData(res?.list || []);
			setRowCount(res?.total || 0);
		} catch {
			setData([]);
			setRowCount(0);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		getDataFn();
	}, [pagination.pageIndex, pagination.pageSize]);

	const showEllipsis = table.getPageCount() > 5;

	const paginationRender = () => {
		if (showEllipsis) {
		}
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
						{Array.from({ length: table.getPageCount() }).map((_, index) => {
							const isFirstPage = index === 0;
							const isLastPage = index === table.getPageCount() - 1;
							if (isFirstPage || isLastPage) {
								return null;
							}
							if (showEllipsis) {
								if (
									pagination.pageIndex > 4 &&
									index < pagination.pageIndex - 2
								) {
									return null;
								}
								if (
									pagination.pageIndex < table.getPageCount() - 5 &&
									index > pagination.pageIndex + 2
								) {
									return null;
								}
							}
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
						{showEllipsis &&
							pagination.pageIndex < table.getPageCount() - 5 && (
								<PaginationItem>
									<PaginationEllipsis />
								</PaginationItem>
							)}
						{table.getPageCount() > 1 && (
							<PaginationItem key={Math.random()}>
								<PaginationLink
									onClick={() => table.setPageIndex(table.getPageCount() - 1)}
									isActive={table.getPageCount() - 1 === pagination.pageIndex}
								>
									{table.getPageCount()}
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
							table.getRowModel().rows.map((row) => (
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
							))
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
							<TableRow className="flex items-center justify-center h-full absolute top-0 left-0 right-0 bottom-0 bg-secondary/90 hover:bg-secondary/90">
								<TableCell className="animate-spin">
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
