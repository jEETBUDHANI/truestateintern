import axios from 'axios';

const client = axios.create({
  baseURL: 'http://localhost:4000',
});

export function fetchTransactions(params){
  return client.get('/api/transactions', { params })
    .then(res => res.data);
}
