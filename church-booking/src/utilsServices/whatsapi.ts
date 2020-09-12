import axios from 'axios';

const whatsapi = axios.create({
  baseURL: 'http://18.228.4.154:8000'
})

export default whatsapi;
