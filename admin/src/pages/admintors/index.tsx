import { DataTable, DataTableActionRef } from "@/components/DataTable";
import { admintorsControllerGetPageList } from "@/services";
import { Title, Flex, Icon } from "@/components";
import { getColumns } from "./columns";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRef } from "react";
const Admintors = () => {
	const actionRef = useRef<DataTableActionRef>(null);
	return (
		<div className="p-5 flex flex-col gap-4">
			<Title level="h4">管理人员</Title>
			<Flex justify="between" align="center">
				<Input className="w-1/3" placeholder="搜索" />
				<Button>
					<Icon name="Plus" className="mr-2 h-4 w-4" />
					新增
				</Button>
			</Flex>

			<DataTable
				actionRef={actionRef}
				border
				columns={getColumns(actionRef)}
				getData={async (pagination) => {
					console.log("pagination", pagination);
					const res = await admintorsControllerGetPageList({
						query: {
							pageNo: pagination.pageIndex + 1,
							pageSize: pagination.pageSize,
						},
						body: {},
					});
					return {
						total: res.data?.total || 0,
						list: res.data?.list?.map((item) => {
							return {
								id: item._id,
								...item
							}
						}) || [],
						...pagination,
					};
				}}
			/>
		</div>
	);
};

export default Admintors;
