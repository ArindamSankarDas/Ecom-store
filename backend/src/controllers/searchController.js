import { prisma } from '../config/prismaConfig.js';

export async function searchProduct(req, _res, next) {
	console.log('hello');

	const { q } = req.query;

	if (!q || !q.trim()) {
		return next(new Error('Empty Query'));
	}

	try {
		const formatedQuery = q.trim().replace(/s+/g, '&');

		const filteredData = await prisma.$queryRaw`
			SELECT * FROM "Product"
			WHERE to_tsvector('english', title || ' ' || description) @@ to_tsquery(${formatedQuery});
		`;

		req.filteredData = filteredData;

		next();
	} catch (error) {
		next(error);
	}
}
