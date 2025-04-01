import { rolesControllerGetAll, RolesResultDto } from '@/client';
import { useEffect, useState } from 'react';

const useRoleOptions = () => {
  const [list, setList] = useState<RolesResultDto[]>([]);
  const getData = async () => {
    const { data } = await rolesControllerGetAll({
      body: {},
    });
    if (data) {
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
