import { useEffect, useState } from "react";
import { columns } from "./columns";
import { DataTable } from "@/components/DataTable";
import { admintorsControllerGetPageList, ResultAdmintorDto } from "@/services";
import { Card } from "@/components/ui/card";
import { Title, Text, Flex } from "@/components";
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
		<div className="p-5">
			<Title level="h1">管理人员</Title>
			<Title level="h2">管理人员</Title>
			<Title level="h3">管理人员</Title>
			<Title level="h4">管理人员</Title>
			<Flex vertical gap={2}>
				<Flex gap={2}>
					<Text size={"small"}>TextPrimary</Text>
					<Text>TextPrimary</Text>
					<Text size={"large"}>TextPrimary</Text>
				</Flex>
				<Flex gap={2}>
					<Text bold size={"small"}>
						bold small
					</Text>
					<Text bold>bold</Text>
					<Text bold size={"large"}>
						bold large
					</Text>
				</Flex>
				<Text>primary</Text>
				<Text type={"muted"}>muted</Text>
				<Text type={"success"}>success</Text>
				<Text type={"warning"}>warning</Text>
				<Text type={"error"}>error</Text>
			</Flex>
			<Card className="p-5">
				<DataTable columns={columns} data={data} />
			</Card>
		</div>
	);
};

export default Admintors;
