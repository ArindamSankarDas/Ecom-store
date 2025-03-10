import { prisma } from "../config/prismaConfig.js"
import productsData from '../utils/data.json' with { type: 'json' };

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

export async function getCategoryList(_req, res, next){
  try{
    const fetchedCategories = await prisma.product.findMany({
      distinct: ['category'],
      select: {
        category: true
      }
    }) 

    const result = fetchedCategories.map(item => item.category);

    res.status(200).json(result);
  }catch(error){
    next(error)
  }
}