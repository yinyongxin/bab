import { MenuTypeEnum } from '@/client';
import { useAppSelector } from '@/store';
import { SpotlightActionData, Spotlight } from '@mantine/spotlight';
import { IconSearch } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import FontIcons from '../FontIcons';

const AppSpotlight = () => {
  const navigate = useNavigate();
  const auth = useAppSelector((state) => state.auth);
  const { menus } = auth;
  const actions: SpotlightActionData[] = menus.list
    .filter((item) => item.menuType === MenuTypeEnum.PAGE)
    .map((item) => {
      return {
        id: item._id,
        label: item.name,
        description: item.description,
        onClick: () => {
          const parent = menus.list.find(
            (listItem) => listItem._id === item.parent,
          );
          navigate(`/${parent?.path}/${item.path}`);
        },
        leftSection: (
          <FontIcons style={{ fontSize: 24 }} name={item.icon || 'menu-deep'} />
        ),
      };
    });
  return (
    <Spotlight
      actions={actions}
      nothingFound="未找到"
      highlightQuery
      searchProps={{
        leftSection: <IconSearch size={20} stroke={1.5} />,
        placeholder: '搜索',
      }}
    />
  );
};
export default AppSpotlight;
