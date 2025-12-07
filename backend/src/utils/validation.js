function parseQuery(query) {
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
    page = 1,
    pageSize = 10,
  } = query;

  const errors = [];

  const parsed = {
    q: q?.trim() || '',
    regions: parseCommaList(regions),
    genders: parseCommaList(genders),
    categories: parseCommaList(categories),
    tags: parseCommaList(tags),
    payment: parseCommaList(payment),
    ageMin: ageMin ? Number(ageMin) : undefined,
    ageMax: ageMax ? Number(ageMax) : undefined,
    dateFrom: dateFrom ? new Date(dateFrom) : undefined,
    dateTo: dateTo ? new Date(dateTo) : undefined,
    sort: sort || 'occurred_at_desc',
    page: Number(page) || 1,
    pageSize: Number(pageSize) || 10,
  };

  if (parsed.ageMin && parsed.ageMax && parsed.ageMin > parsed.ageMax) {
    errors.push('ageMin cannot be greater than ageMax');
  }
  if (parsed.dateFrom && parsed.dateTo && parsed.dateFrom > parsed.dateTo) {
    errors.push('dateFrom cannot be later than dateTo');
  }
  if (parsed.page < 1) {
    errors.push('page must be >= 1');
  }
  if (parsed.pageSize < 1 || parsed.pageSize > 100) {
    errors.push('pageSize must be between 1 and 100');
  }

  return { parsed, errors };
}

function parseCommaList(value) {
  if (!value) return [];
  return value.split(',').map(v => v.trim()).filter(Boolean);
}

module.exports = {
  parseQuery,
};
