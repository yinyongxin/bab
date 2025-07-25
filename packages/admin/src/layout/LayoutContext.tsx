import { createContext } from 'react';

type BaseLayoutContextType = {
  activeSubLink: string;
  setActiveSubLink: (value: string) => void;
  activeMainLink: string;
  setActiveMainLink: (value: string) => void;
  openAppSettings: () => void;
  desktop: boolean;
  setDesktop: (value: boolean) => void;
};

const baseLayoutContext = {
  activeSubLink: '',
  setActiveSubLink: () => {},
  activeMainLink: '',
  setActiveMainLink: () => {},
  openAppSettings: () => {},
  desktop: true,
  setDesktop: () => {},
};

const LayoutContext = createContext<BaseLayoutContextType>(baseLayoutContext);
export default LayoutContext;
