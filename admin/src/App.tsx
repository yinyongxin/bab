import '@mantine/core/styles.css';
import '@mantine/dropzone/styles.css';
import { MantineProvider } from '@mantine/core';
import { theme } from './theme';
import { Layout } from '@/components/Layout/Layout';
import { Provider } from 'react-redux';
import store, { persistor } from '@/store';
import { PersistGate } from 'redux-persist/integration/react';
import { BrowserRouter } from 'react-router-dom';
import appConfig from './configs/app.config';
import { ModalsProvider } from '@mantine/modals';

export default function App() {
  return (
    <MantineProvider theme={theme}>
      <ModalsProvider>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <BrowserRouter>
              <Layout />
            </BrowserRouter>
          </PersistGate>
        </Provider>
      </ModalsProvider>
    </MantineProvider>
  );
}
