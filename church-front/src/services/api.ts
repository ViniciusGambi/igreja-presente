import axios from 'axios';

const api = axios.create({
  baseURL: 'https://church-api.cadeo113.online',
});

export default api;
