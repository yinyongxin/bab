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
import { useCallback, useEffect, useState } from "react";

interface DataTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[];
	data: TData[];
	getData?: (pagination?: PaginationState) => void;
	pagination?: PaginationState & {
		total: number;
	};
	border?: boolean;
}

export const DataTable = <TData, TValue>(
	props: DataTableProps<TData, TValue>
) => {
	const {
		columns,
		data,
		border = false,
		pagination: paginationProps,
		getData,
	} = props;
	const [pagination, setPagination] = useState({
		pageIndex: paginationProps?.pageIndex ? paginationProps?.pageIndex - 1 : 0, //initial page index
		pageSize: 10, //default page size
	});
	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		manualPagination: true,
		rowCount: paginationProps?.total || 0,
		state: {
			pagination,
		},
		onPaginationChange: setPagination,
		getPaginationRowModel: getPaginationRowModel(),
	});

	useEffect(() => {
		getData?.(pagination);
	}, [pagination.pageIndex, pagination.pageSize]);

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
					<TableBody>
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
					</TableBody>
				</Table>
			</div>
			<div>{table.getState().pagination.pageIndex}</div>
			{pagination && (
				<div className="flex items-center justify-end pt-4">
					<Pagination>
						<PaginationContent>
							<PaginationItem>
								<PaginationPrevious
									disabled={!table.getCanPreviousPage()}
									onClick={() => table.previousPage()}
								/>
							</PaginationItem>
							{Array.from({ length: table.getPageCount() }).map((_, index) => {
								return (
									<PaginationItem key={Math.random()}>
										<PaginationLink
											onClick={() => table.setPageIndex(index)}
											isActive={index === table.getState().pagination.pageIndex}
										>
											{index + 1}
										</PaginationLink>
									</PaginationItem>
								);
							})}
							<PaginationItem>
								<PaginationEllipsis />
							</PaginationItem>
							<PaginationItem>
								<PaginationNext
									onClick={() => table.nextPage()}
									disabled={!table.getCanNextPage()}
								/>
							</PaginationItem>
						</PaginationContent>
					</Pagination>
				</div>
			)}
		</div>
	);
};
