import { prisma } from '../config/prismaConfig.js';

export async function getProducts(req, _res, next) {
	try {
		const productsData = await prisma.products.findMany({
			include: { reviews: true },
		});

		req.filteredData = productsData;

		next();
	} catch (error) {
		next(error);
	}
}

export async function getProductItem(req, _res, next) {
	try {
		const productItem = await prisma.products.findFirst({
			where: {
				id: parseInt(req.params.productId),
			},
			include: { reviews: true },
		});

		req.filteredData = productItem;
		next();
	} catch (error) {
		next(error);
	}
}

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
