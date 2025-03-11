import { prisma } from '../config/prismaConfig.js';

export async function getCategoryProducts(req, _res, next) {
	try {
		const { productCategory } = req.params;

		const categoryItems = await prisma.product.findMany({
			where: { category: productCategory },
			include: { reviews: true },
		});

		req.filteredData = categoryItems;

		next();
	} catch (error) {
		next(error);
	}
}
