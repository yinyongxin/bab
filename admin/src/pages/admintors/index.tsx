import { useEffect, useState } from "react";
import { DataTable } from "@/components/DataTable";
import { admintorsControllerGetPageList, ResultAdmintorDto } from "@/services";
import { Title, Flex, Icon } from "@/components";
import { columns } from "./columns";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
const Admintors = () => {
	const [data, setData] = useState<ResultAdmintorDto[]>([]);
	const getData = async () => {
		const res = await admintorsControllerGetPageList({
			query: {
				pageNo: 1,
				pageSize: 10,
			},
			body: {},
		});
		setData(res.data?.list || []);
	};
	useEffect(() => {
		getData();
	}, []);
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
				data={data}
				getData={(pagination) => {
					console.log("pagination", pagination);
				}}
				pagination={{
					pageIndex: 1,
					pageSize: 10,
					total: 30,
				}}
			/>
		</div>
	);
};

export default Admintors;
