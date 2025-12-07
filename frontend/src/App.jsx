import React from 'react';
import SearchBar from './components/SearchBar';
import FilterPanel from './components/FilterPanel';
import TransactionsTable from './components/TransactionsTable';
import PaginationControls from './components/PaginationControls';
import useTransactions from './hooks/useTransactions';

export default function App(){
  const {
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
  } = useTransactions();

  return (
    <div className="app">
      <header>
        <div className="brand">
          <div className="logo">TE</div>
          <div>
            <h1>TruEstate — Retail Sales Dashboard</h1>
            <div className="muted">Search, filter, sort & paginate transactions</div>
          </div>
        </div>
        <div className="flex space-x">
          <div className="muted">Total: {total}</div>
          <div>
            <select
              value={sort}
              onChange={e=>setSort(e.target.value)}
              className="select"
            >
              <option value="occurred_at_desc">Date (Newest)</option>
              <option value="occurred_at_asc">Date (Oldest)</option>
              <option value="quantity_desc">Quantity (High→Low)</option>
              <option value="quantity_asc">Quantity (Low→High)</option>
              <option value="customer_name_asc">Customer A→Z</option>
              <option value="customer_name_desc">Customer Z→A</option>
            </select>
          </div>
        </div>
      </header>

      <div className="layout">
        <aside className="card">
          <SearchBar value={q} onChange={v=>{ setQ(v); setPage(1); }} />
          <div style={{height:12}}/>
          <FilterPanel onApply={applyFilters} />
        </aside>

        <main>
          <div className="card transactionsTable">
            {error && (
              <div className="error-banner">
                <strong>Invalid filters:</strong> {error}
              </div>
            )}
            <TransactionsTable data={data} loading={loading} />
            <div className="footer">
              <PaginationControls
                page={page}
                pageSize={pageSize}
                total={total}
                onPageChange={setPage}
              />
              <div className="muted">Showing {data.length} of {total}</div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
