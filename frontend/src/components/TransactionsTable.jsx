import React from 'react';

export default function TransactionsTable({ data, loading }){
  if (loading) return <div className="muted">Loading...</div>;
  if (!data || data.length === 0) return <div className="muted">No results found</div>;

  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Customer</th>
          <th>Product</th>
          <th>Qty</th>
          <th>Final</th>
          <th>Payment</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        {data.map(t => (
          <tr key={t.id}>
            <td>{t.id}</td>
            <td>
              <div style={{fontWeight:600}}>{t.customer_name || 'Unknown'}</div>
              <div className="muted">
                {(t.customer_phone || 'N/A')} • {(t.region || 'Unknown')} • {t.age ? `${t.age}y` : 'Age N/A'}
              </div>
            </td>
            <td>
              <div>{t.product_name || 'Unknown product'}</div>
              <div className="muted">
                {t.category || 'No category'}
                {t.tags && t.tags.length ? ` • ${t.tags.join(', ')}` : ''}
              </div>
            </td>
            <td>{t.quantity ?? '-'}</td>
            <td>₹{t.final_amount ?? '-'}</td>
            <td>{t.payment_method || 'Unknown'}</td>
            <td className="muted">
              {t.occurred_at ? new Date(t.occurred_at).toLocaleDateString() : '—'}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
