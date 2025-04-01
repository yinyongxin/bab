import { rolesControllerGetAll, RolesResultDto } from '@/client';
import { useEffect, useState } from 'react';

let catchList: RolesResultDto[] = [];
const useRoleOptions = () => {
  const [list, setList] = useState<RolesResultDto[]>(catchList);
  const getData = async () => {
    if (catchList.length > 0) {
      return;
    }
    const { data } = await rolesControllerGetAll({
      body: {},
    });
    if (data) {
      catchList = data;
      setList(data);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  return [
    list.map((item) => {
      return { label: item.name, value: item._id };
    }),
    list,
  ] as const;
};

export default useRoleOptions;
