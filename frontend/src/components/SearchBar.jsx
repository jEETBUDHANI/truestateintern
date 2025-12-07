import React, {useEffect, useState} from 'react';

export default function SearchBar({ value, onChange }){
  const [local, setLocal] = useState(value || '');
  useEffect(()=> setLocal(value || ''), [value]);

  useEffect(()=>{
    const id = setTimeout(()=> onChange(local), 300);
    return () => clearTimeout(id);
  }, [local]);

  return (
    <div>
      <div className="muted" style={{marginBottom:6}}>Search</div>
      <div className="searchBox">
        <input
          value={local}
          onChange={e=>setLocal(e.target.value)}
          placeholder="Search customer name or phone..."
        />
      </div>
    </div>
  );
}
