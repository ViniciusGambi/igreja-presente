import axios from 'axios';

const whatsapi = axios.create({
  baseURL: 'http://localhost:3334',
  headers: {'content-type': 'application/json'}
})

export default whatsapi;
