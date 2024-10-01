import { defineConfig } from '@hey-api/openapi-ts';

export default defineConfig({
  client: '@hey-api/client-fetch',
  input: 'http://localhost:3000/api-json',
  output: 'src/services',
  services: {
    asClass: false, 
  },
});