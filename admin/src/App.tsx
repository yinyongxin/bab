import { MantineProvider, createTheme } from '@mantine/core';
import { Layout } from '@/layout/Layout';
import { Provider } from 'react-redux';
import store, { persistor, useAppSelector } from '@/store';
import { PersistGate } from 'redux-persist/integration/react';
import { BrowserRouter } from 'react-router-dom';
import { ModalsProvider } from '@mantine/modals';
import { Notifications } from '@mantine/notifications';

import '@mantine/core/styles.css';
import '@mantine/dropzone/styles.css';
import '@mantine/notifications/styles.css';
import '@mantine/spotlight/styles.css';
import '@mantine/dates/styles.css';
import '@mantine/carousel/styles.css';
import '@mantine/tiptap/styles.css';
import './App.css';

import { useMemo } from 'react';

const AppContent = () => {
  const appTheme = useAppSelector((state) => state.appTheme);
  const theme = useMemo(() => {
    return createTheme(appTheme);
  }, [appTheme]);
  return (
    <MantineProvider theme={theme}>
      <Notifications />
      <ModalsProvider>
        <PersistGate loading={null} persistor={persistor}>
          <BrowserRouter>
            <Layout />
          </BrowserRouter>
        </PersistGate>
      </ModalsProvider>
    </MantineProvider>
  );
};
export default function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}
