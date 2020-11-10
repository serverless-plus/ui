import axios from 'axios';

const isDev = process.env.NODE_ENV === 'development';
const BASE_URL = isDev ? 'http://localhost:3000/' : '/';

const request = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

interface ApiErrorInstance extends Error {
  type: string;
  message: string;
  stack: string;
  reqId: string;
  displayMsg: string;
  code: string | number;
}

export { request, ApiErrorInstance };
