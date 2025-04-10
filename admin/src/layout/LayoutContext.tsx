import { createContext } from 'react';

type BaseLayoutContextType = {
  activeSubLink: string;
  setActiveSubLink: (value: string) => void;
  activeMainLink: string;
  setActiveMainLink: (value: string) => void;
  openAppSettingsAction: () => void;
};

const baseLayoutContext = {
  activeSubLink: '',
  setActiveSubLink: () => {},
  activeMainLink: '',
  setActiveMainLink: () => {},
  openAppSettingsAction: () => {},
};

const LayoutContext = createContext<BaseLayoutContextType>(baseLayoutContext);
export default LayoutContext;
