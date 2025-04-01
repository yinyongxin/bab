import ReactDOM from 'react-dom/client';
import App from './App';
import { client } from './client/client.gen';

// configure internal service client
client.setConfig({
  // set default base url for requests
  // baseURL: 'http://localhost:3000',
  // set default headers for requests
  headers: {
    Authorization: 'Bearer <token_from_service_client>',
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(<App />);
