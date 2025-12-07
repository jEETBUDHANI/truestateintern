const { parseQuery } = require('../utils/validation');
const { filterSortPaginate } = require('../services/transactionsService');

function getTransactions(req, res) {
  const { parsed, errors } = parseQuery(req.query);

  if (errors.length) {
    return res.status(400).json({
      error: 'Invalid filters',
      details: errors,
    });
  }

  const result = filterSortPaginate(parsed);

  res.json({
    ...result,
    appliedFilters: parsed,
  });
}

module.exports = {
  getTransactions,
};
