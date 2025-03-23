import { prisma } from '../config/prismaConfig.js';

// retreives query products in respective to it's category
export async function getCategoryProducts(req, _res, next) {
	try {
		const { productCategory } = req.params;

		const categoryItems = await prisma.products.findMany({
			where: { category: productCategory },
			include: { reviews: true },
		});

		// passing filtered data to the query parser middleware
		req.filteredData = categoryItems;

		next();
	} catch (error) {
		next(error);
	}
}
