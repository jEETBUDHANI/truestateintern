import React, {useState} from 'react';

const regions = ['North','South','East','West','Central'];
const genders = ['Male','Female','Other'];
const categories = ['Electronics','Grocery','Clothing','Furniture','Books'];
const payments = ['UPI','Card','Cash','NetBanking'];

export default function FilterPanel({ onApply }){
  const [region,setRegion] = useState('');
  const [gender,setGender] = useState('');
  const [category,setCategory] = useState('');
  const [tag,setTag] = useState('');
  const [dateFrom,setDateFrom] = useState('');
  const [dateTo,setDateTo] = useState('');
  const [ageMin,setAgeMin] = useState('');
  const [ageMax,setAgeMax] = useState('');
  const [payment,setPayment] = useState('');

  const apply = ()=>{
    const obj = {};
    if(region) obj.regions = region;
    if(gender) obj.genders = gender;
    if(category) obj.categories = category;
    if(tag) obj.tags = tag;
    if(dateFrom) obj.dateFrom = dateFrom;
    if(dateTo) obj.dateTo = dateTo;
    if(ageMin) obj.ageMin = ageMin;
    if(ageMax) obj.ageMax = ageMax;
    if(payment) obj.payment = payment;
    onApply(obj);
  };

  const reset = ()=>{
    setRegion(''); setGender(''); setCategory(''); setTag('');
    setDateFrom(''); setDateTo(''); setAgeMin(''); setAgeMax(''); setPayment('');
    onApply({});
  };

  return (
    <div className="filters">
      <label>Region
        <select value={region} onChange={e=>setRegion(e.target.value)}>
          <option value="">Any</option>
          {regions.map(r => <option key={r} value={r}>{r}</option>)}
        </select>
      </label>

      <label>Gender
        <select value={gender} onChange={e=>setGender(e.target.value)}>
          <option value="">Any</option>
          {genders.map(g => <option key={g} value={g}>{g}</option>)}
        </select>
      </label>

      <label>Category
        <select value={category} onChange={e=>setCategory(e.target.value)}>
          <option value="">Any</option>
          {categories.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </label>

      <label>Tag (comma separated)
        <input value={tag} onChange={e=>setTag(e.target.value)} placeholder="e.g. sale, promo" />
      </label>

      <label>Payment Method
        <select value={payment} onChange={e=>setPayment(e.target.value)}>
          <option value="">Any</option>
          {payments.map(p => <option key={p} value={p}>{p}</option>)}
        </select>
      </label>

      <label>Age Min
        <input value={ageMin} onChange={e=>setAgeMin(e.target.value)} type="number" />
      </label>
      <label>Age Max
        <input value={ageMax} onChange={e=>setAgeMax(e.target.value)} type="number" />
      </label>

      <label>Date From
        <input value={dateFrom} onChange={e=>setDateFrom(e.target.value)} type="date" />
      </label>
      <label>Date To
        <input value={dateTo} onChange={e=>setDateTo(e.target.value)} type="date" />
      </label>

      <div style={{marginTop:10, display:'flex', gap:8}}>
        <button className="btn" onClick={apply}>Apply</button>
        <button className="btn" style={{background:'transparent', border:'1px solid rgba(255,255,255,0.05)'}} onClick={reset}>Reset</button>
      </div>
    </div>
  );
}
