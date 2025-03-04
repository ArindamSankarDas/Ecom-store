import productsData from '../utils/data.json' with { type: 'json' };

export function getCategoryProducts(req, _res, next) {
  const { productCategory } = req.params;

  const filteredData = productsData.filter(function (product) {
    return product.category === productCategory;
  });

  req.filteredData = filteredData;

  next();
}
