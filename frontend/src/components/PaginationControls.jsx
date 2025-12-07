import React from 'react';

export default function PaginationControls({ page, pageSize, total, onPageChange }){
  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  return (
    <div style={{display:'flex', gap:8, alignItems:'center'}}>
      <button className="btn" onClick={() => onPageChange(Math.max(1, page - 1))}>Prev</button>
      <div className="muted">Page {page} of {totalPages}</div>
      <button className="btn" onClick={() => onPageChange(Math.min(totalPages, page + 1))}>Next</button>
    </div>
  );
}
