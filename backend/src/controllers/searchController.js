import productsData from '../utils/data.json' with { type: 'json' };

export function searchProduct(req, _res, next) {
  const { q } = req.query;

  if (!q.toLowerCase()) {
    next(new Error('Empty Query'));
    return;
  }

  const filteredData = productsData.filter(function (product) {
    return Object.values(product).some(function (value) {
      return (
        typeof value === 'string' &&
        value.toLowerCase().includes(q.toLowerCase())
      );
    });
  });

  req.filteredData = filteredData;

  next();
}
