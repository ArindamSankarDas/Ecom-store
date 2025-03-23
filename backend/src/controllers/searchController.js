import { prisma } from '../config/prismaConfig.js';

// retrieves the searched items from the search bar
export async function searchProduct(req, _res, next) {
	const { q } = req.query;

	if (!q || !q.trim()) {
		return next(new Error('Empty Query'));
	}

	try {
		const filteredData = await prisma.$queryRaw`
			SELECT * FROM "Products"
			WHERE to_tsvector('english', title || ' ' || description) @@ to_tsquery(${q.trim()});
		`;

		req.filteredData = filteredData;

		next();
	} catch (error) {
		next(error);
	}
}
