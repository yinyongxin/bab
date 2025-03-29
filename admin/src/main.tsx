import ReactDOM from 'react-dom/client';
import App from './App';
import { client } from './client/client.gen';

// configure internal service client
client.setConfig({
  // set default base url for requests
  baseURL: 'http://192.168.31.246:3000/api',
  // set default headers for requests
  headers: {
    Authorization: 'Bearer <token_from_service_client>',
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(<App />);
