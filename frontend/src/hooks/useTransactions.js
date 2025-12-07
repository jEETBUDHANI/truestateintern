import { useEffect, useState } from 'react';
import { fetchTransactions } from '../services/api';

export default function useTransactions(){
  const [q, setQ] = useState('');
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState('occurred_at_desc');
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    setError('');
    const params = { q, sort, page, pageSize, ...filters };
    fetchTransactions(params)
      .then(res => {
        setData(res.data);
        setTotal(res.total);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        if (err.response && err.response.data && err.response.data.details) {
          setError(err.response.data.details.join(', '));
        } else {
          setError('Something went wrong. Please try again.');
        }
        setLoading(false);
      });
  }, [q, filters, sort, page, pageSize]);

  const applyFilters = (f) => {
    setFilters(f);
    setPage(1);
  };

  return {
    q,
    setQ,
    sort,
    setSort,
    filters,
    applyFilters,
    page,
    setPage,
    pageSize,
    data,
    total,
    loading,
    error,
  };
}
