function selectProps(selectInfo, productData) {
  if (!selectInfo) return productData;

  let newProductObj = {
    id: productData.id,
  };

  selectInfo.split(",").map(function (selection) {
    newProductObj[selection] = productData[selection];
  });

  return newProductObj;
}

function queryParser(req, res, next) {
  const fetchedProducts = req.filteredData;
  const { limit = "30", select, skip = "0" } = req.query;

  if (!fetchedProducts) {
    next();
    return;
  }

  if (!Array.isArray(fetchedProducts)) {
    const fetchedProduct = selectProps(select, fetchedProducts);

    res.status(200).json(fetchedProduct);
    return;
  }

  const skippedProductItems = parseInt(skip)
    ? fetchedProducts.slice(parseInt(skip))
    : fetchedProducts;

  const filteredList =
    parseInt(limit) === 0
      ? skippedProductItems
      : skippedProductItems.slice(0, parseInt(limit)).map(function (product) {
          return selectProps(select, product);
        });

  const dataObj = {
    products: filteredList,
    total: fetchedProducts.length,
    mode: "development",
    skip: 0,
    limit: filteredList.length,
  };

  res.status(200).json(dataObj);
}

export default queryParser;
