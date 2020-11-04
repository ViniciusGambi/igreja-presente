import axios from 'axios';

const api = axios.create({
  baseURL: 'https://church-api.cadeo113.online',
  //baseURL: 'http://192.168.1.150:3333',
});

export default api;
