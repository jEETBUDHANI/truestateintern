import axios from 'axios';

const client = axios.create({
  baseURL: 'https://truestateintern.onrender.com',
});


export function fetchTransactions(params){
  return client.get('/api/transactions', { params })
    .then(res => res.data);
}
