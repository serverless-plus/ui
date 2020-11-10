import axios from 'axios';

const BASE_URL = 'http://localhost:3000';

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
