import { prisma } from '../config/prismaConfig.js';

// retreives all the products
export async function getProducts(req, _res, next) {
	try {
		const productsData = await prisma.products.findMany({
			include: { reviews: true },
		});

		// passing filtered data to the query parser middleware
		req.filteredData = productsData;

		next();
	} catch (error) {
		next(error);
	}
}

// retreives a single product item
export async function getProductItem(req, _res, next) {
	try {
		const productItem = await prisma.products.findFirst({
			where: {
				id: parseInt(req.params.productId),
			},
			include: { reviews: true },
		});

		// passing filtered data to the query parser middleware
		req.filteredData = productItem;

		next();
	} catch (error) {
		next(error);
	}
}

// retrieves a array of available products
export async function getCategoryList(_req, res, next) {
	try {
		const fetchedCategories = await prisma.products.findMany({
			distinct: ['category'],
			select: {
				category: true,
			},
		});

		const result = fetchedCategories.map((item) => item.category);

		res.status(200).json(result);
	} catch (error) {
		next(error);
	}
}
