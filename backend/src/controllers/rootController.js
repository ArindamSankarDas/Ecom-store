import productsData from "../utils/data.json" with {type: "json"};


export function getProducts(req, res){
  const { limit = 30 } = req.query;	

  const queriedProductLength = parseInt(limit) === 0 ? productsData : productsData.filter(function (product) {
      return product.id <= parseInt(limit);
  });

  const dataObj = {
    products: queriedProductLength,
    total: productsData.length,
	 mode: "development",
    skip: 0,
    limit: queriedProductLength.length,
  };

  res.status(200).json(dataObj);

}
