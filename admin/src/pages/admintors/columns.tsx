import { Switch } from "@/components/ui/switch";
import { ResultAdmintorDto } from "@/services";
import { ColumnDef } from "@tanstack/react-table";


export const columns: ColumnDef<ResultAdmintorDto>[] = [
	{
		accessorKey: 'username',
		header: "姓名",
	},
	{
		accessorKey: "status",
		header: "状态",
		cell: ({row}) => {
			return (<Switch checked={row.getValue("status") === 'Open' } />)
		}
	},
	{
		accessorKey: "createdTime",
		header: "创建时间",
		
	},
];
