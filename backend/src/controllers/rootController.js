import productsData from "../utils/data.json" with {type: "json"};

export function getProducts(req, _res, next) {
  req.filteredData = productsData;
  next();
}

export function getProductItem(req, _res, next){
    const findData = productsData.find(function (product) {
      return product.id === parseInt(req.params.productId)
    });

    req.filteredData = findData;
    next();
}

export function getCategoryList(_req, res){
  let fetchedCategories = {};

  productsData.forEach(function (product) {
    if(!(product.category in fetchedCategories)){
      fetchedCategories[product.category] = 1;
    }
  });

  res.status(200).json(Object.keys(fetchedCategories));
}