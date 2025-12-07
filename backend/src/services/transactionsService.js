const fs = require('fs');
const path = require('path');

const DATA_PATH = path.join(__dirname, '..', '..', 'data', 'transactions.json');
const TRANSACTIONS = JSON.parse(fs.readFileSync(DATA_PATH, 'utf8'));

function textMatch(value, q) {
  if (!value || !q) return false;
  return value.toString().toLowerCase().includes(q.toLowerCase());
}

function filterSortPaginate(params) {
  const {
    q,
    regions,
    genders,
    ageMin,
    ageMax,
    categories,
    tags,
    payment,
    dateFrom,
    dateTo,
    sort,
    page,
    pageSize,
  } = params;

  let results = TRANSACTIONS.slice();

  if (q) {
    results = results.filter(t =>
      textMatch(t.customer_name, q) || textMatch(t.customer_phone, q)
    );
  }

  if (regions && regions.length) {
    const set = new Set(regions.map(v => v.toLowerCase()));
    results = results.filter(t => t.region && set.has(t.region.toLowerCase()));
  }

  if (genders && genders.length) {
    const set = new Set(genders.map(v => v.toLowerCase()));
    results = results.filter(t => t.gender && set.has(t.gender.toLowerCase()));
  }

  if (typeof ageMin === 'number' || typeof ageMax === 'number') {
    const min = typeof ageMin === 'number' ? ageMin : -Infinity;
    const max = typeof ageMax === 'number' ? ageMax : Infinity;
    results = results.filter(t => typeof t.age === 'number' && t.age >= min && t.age <= max);
  }

  if (categories && categories.length) {
    const set = new Set(categories.map(v => v.toLowerCase()));
    results = results.filter(t => t.category && set.has(t.category.toLowerCase()));
  }

  if (tags && tags.length) {
    const tagsSet = new Set(tags.map(v => v.toLowerCase()));
    results = results.filter(t =>
      Array.isArray(t.tags) && t.tags.some(tag => tagsSet.has(String(tag).toLowerCase()))
    );
  }

  if (payment && payment.length) {
    const set = new Set(payment.map(v => v.toLowerCase()));
    results = results.filter(t => t.payment_method && set.has(t.payment_method.toLowerCase()));
  }

  if (dateFrom || dateTo) {
    const from = dateFrom || new Date('1970-01-01');
    const to = dateTo || new Date('2100-01-01');
    results = results.filter(t => {
      if (!t.occurred_at) return false;
      const d = new Date(t.occurred_at);
      return d >= from && d <= to;
    });
  }

  let [field, direction] = sort.split('_');
  if (!field) field = 'occurred_at';
  const dir = direction === 'asc' ? 1 : -1;

  if (field === 'date') field = 'occurred_at';
  if (field === 'customer') field = 'customer_name';

  results.sort((a, b) => {
    let A = a[field];
    let B = b[field];
    if (A == null && B == null) return 0;
    if (A == null) return 1;
    if (B == null) return -1;
    if (typeof A === 'string' && typeof B === 'string') {
      A = A.toLowerCase();
      B = B.toLowerCase();
    }
    if (A < B) return -1 * dir;
    if (A > B) return 1 * dir;
    return 0;
  });

  const total = results.length;
  const safePage = Math.max(1, page);
  const safePageSize = Math.max(1, Math.min(100, pageSize));
  const start = (safePage - 1) * safePageSize;
  const pageItems = results.slice(start, start + safePageSize);

  return {
    data: pageItems,
    total,
    page: safePage,
    pageSize: safePageSize,
  };
}

module.exports = {
  filterSortPaginate,
};
