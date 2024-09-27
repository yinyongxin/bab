import type { Component } from 'solid-js';
import { Router } from '@solidjs/router';

import { routes } from './routes';
import Layout from './layout';

const App: Component = () => {

  return <Layout />;
};

export default App;