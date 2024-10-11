import {
	PaginationState,
} from "@tanstack/react-table";
import { list } from "radash";
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
import { Card } from "./ui/card";
import { Spin } from "./Spin";

export type PaginationDataActionRef = {
	refresh: (options?: { showLoading?: boolean }) => void;
};

interface PaginationDataProps<TData> {
	cols?: number;
	gap?: number;
	dataItemRender: (dataItem: TData) => React.ReactNode;
	getData?: (pagination: PaginationState) => Promise<
		Partial<PaginationState> & {
			total: number;
			list: Array<TData>;
		}
	>;
	border?: boolean;
	showLoading?: boolean;
	actionRef?: React.RefObject<PaginationDataActionRef>;
}

export function PaginationData<TData>(
	props: PaginationDataProps<TData>
) {
	const { dataItemRender, border = false, showLoading = true, getData, cols = 1, gap = 4 } = props;
	const [loading, setLoading] = useState(true);
	const [pagination, setPagination] = useState({
		pageIndex: 0, //initial page index
		pageSize: 10, //default page size
	});
	const [rowCount, setRowCount] = useState(0);
	const [data, setData] = useState<TData[]>([]);
	const getDataFn = async (options: { showLoading: boolean }) => {
		try {
			if (options.showLoading) {
				setLoading(true);
			}
			const res = await getData?.(pagination);
			setData(res?.list || []);
			setRowCount(res?.total || 0);
		} catch {
			setData([]);
			setRowCount(0);
		} finally {
			if (showLoading) {
				setTimeout(() => {
					setLoading(false);
				}, 5000)
			}
		}
	};

	useEffect(() => {
		getDataFn({ showLoading: showLoading });
	}, [pagination.pageIndex, pagination.pageSize]);

	const nextPage = () => {
		setPagination({
			...pagination,
			pageIndex: pagination.pageIndex + 1
		})
	}
	const previousPage = () => {
		setPagination({
			...pagination,
			pageIndex: pagination.pageIndex - 1
		})
	}
	const setPageIndex = (pageIndex: number) => {
		setPagination({
			...pagination,
			pageIndex
		})
	}

	/**
	 * 生成并渲染分页组件
	 * 此函数用于动态生成分页组件，根据当前表格的页数决定是否显示省略号
	 */
	const paginationRender = () => {
		// 获取当前表格的页数
		const pageCount = Math.ceil(rowCount / pagination.pageSize);
		// 当表格页数超过5页时，显示省略号
		const showEllipsis = pageCount > 5;
		const canPrevious = pagination.pageIndex > 0;
		const canNext = pagination.pageIndex < pageCount - 1;
		return (
			<div className="flex items-center justify-end pt-4">
				<Pagination>
					<PaginationContent>
						<PaginationItem>
							<PaginationPrevious
								disabled={!canPrevious}
								onClick={() => previousPage()}
							/>
						</PaginationItem>
						<PaginationItem>
							<PaginationLink
								onClick={() => setPageIndex(0)}
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
									onClick={() => setPageIndex(pageIndex)}
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
							<PaginationItem>
								<PaginationLink
									onClick={() => setPageIndex(pageCount - 1)}
									isActive={pageCount - 1 === pagination.pageIndex}
								>
									{pageCount}
								</PaginationLink>
							</PaginationItem>
						)}
						<PaginationItem>
							<PaginationNext
								onClick={() => nextPage()}
								disabled={!canNext}
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
	const Comp = border ? Card : "div";

	return (
		<Comp
			className={cn([
				{
					"rounded-md": border,
					"p-4": border,
				},
			])}
		>
			<Spin spinning={loading}>
				<div
					className={cn([`grid gap-${gap}`])}
					style={{
						gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`
					}}
				>

					{data.map(dataItem => dataItemRender(dataItem))}
				</div>
			</Spin>
			{paginationRender()}
		</Comp>
	)
};
