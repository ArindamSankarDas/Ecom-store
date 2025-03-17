import { SignUpFormData, loginFormData } from '@/lib/types';

const BASE_URL = import.meta.env.VITE_BASE_API_URL;

// Product Fetches
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

// Auth Fetches
export const signUpUser = async function (signUpData: SignUpFormData) {
	try {
		const response = await fetch(`${BASE_URL}/auth/register`, {
			method: 'POST',
			headers: {
				'Content-type': 'application/json',
			},
			credentials: 'include',
			body: JSON.stringify(signUpData),
		});

		const result = await response.json();

		return result;
	} catch (error) {
		console.log(error);
	}
};

export const loginUser = async function (loginData: loginFormData) {
	try {
		const response = await fetch(`${BASE_URL}/auth/login`, {
			method: 'POST',
			headers: {
				'Content-type': 'application/json',
			},
			credentials: 'include',
			body: JSON.stringify(loginData),
		});

		const result = await response.json();

		return result;
	} catch (error) {
		console.log(error);
	}
};

export const logoutUser = async function () {
	try {
		const response = await fetch(`${BASE_URL}/auth/logout`, {
			method: 'POST',
			credentials: 'include',
		});

		if (response.ok) {
			console.log('Logout successful');
		} else {
			console.error('Logout failed');
		}
	} catch (error) {
		console.log(error);
	}
};
