const BASE_URL = import.meta.env.VITE_BASE_API_URL;

export const fetchProductsCategoryList = async function (
	abortSignal: AbortSignal
) {
	const response = await fetch(`${BASE_URL}/category-list`, {
		signal: abortSignal,
	});

	const result = await response.json();

	return result;
};

export const fetchProductSuggestions = async function (query: string) {
	const reponse = await fetch(
		`${BASE_URL}/search?q=${query}&select=id,title,category`
	);

	const result = await reponse.json();

	return result.products;
};

export const fetchProductItem = async function (productId: string | undefined) {
	const response = await fetch(`${BASE_URL}/${productId}`);

	const result = await response.json();

	return result;
};

export const fetchProducts = async function (url: string, count: number) {
	const response = await fetch(`${BASE_URL}${url}&skip=${count}`);
	const result = await response.json();

	return result;
};
