import { useEffect, useState } from "react";
import { columns } from "./columns";
import { DataTable } from "@/components/DataTable";
import { admintorsControllerGetPageList, ResultAdmintorDto } from "@/services";
import { Card } from "@/components/ui/card";
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
		<div className="container mx-auto p-5">
			<Card className="p-5">
				<DataTable columns={columns} data={data} />
			</Card>
		</div>
	);
};

export default Admintors;
