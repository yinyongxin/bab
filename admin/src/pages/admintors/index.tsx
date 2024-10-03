import { DataTable } from "@/components/DataTable";
import { admintorsControllerGetPageList } from "@/services";
import { Title, Flex, Icon } from "@/components";
import { columns } from "./columns";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
const Admintors = () => {
	return (
		<div className="p-5 flex flex-col gap-4">
			<Title level="h4">管理人员</Title>
			<Flex justify="between" align="center">
				<Input className="w-1/3" placeholder="搜索" />
				<Button>
					<Icon name="Plus" />
					新增
				</Button>
			</Flex>

			<DataTable
				border
				columns={columns}
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
						total: 200,
						list: res.data?.list || [],
						...pagination,
					};
				}}
			/>
		</div>
	);
};

export default Admintors;
