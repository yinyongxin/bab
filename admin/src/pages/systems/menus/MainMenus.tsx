import { TreeMenuDataDto } from '@/client';

type MainMenuProps = {
  data: TreeMenuDataDto;
};

const MainMenu = (props: MainMenuProps) => {
  const { data } = props;
  return <div>{data.name}</div>;
};
export default MainMenu;
