import { SignUpFormData, LoginFormData, CartItem } from '@lib/types';

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

export const fetchProductItem = async function (productId: number | undefined) {
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

export const loginUser = async function (loginData: LoginFormData) {
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
			headers: {
				'Content-type': 'application/json',
			},
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

export const refreshTokenUser = async function () {
	try {
		const response = await fetch(`${BASE_URL}/auth/refresh`, {
			method: 'POST',
			headers: {
				'Content-type': 'application/json',
			},
			credentials: 'include',
		});

		const result = await response.json();

		return result;
	} catch (error) {
		console.log(error);
	}
};

export const getCurrentUser = async function (accessToken: string | null) {
	const response = await fetch(`${BASE_URL}/profile/user`, {
		method: 'GET',
		headers: {
			Authorization: `Bearer ${accessToken}`,
		},
		credentials: 'include',
	});

	if (response.status === 403) {
		throw new Error(response.status.toString());
	}

	const result = await response.json();

	return result;
};

export const updateCurrentUser = async function (
	name: string,
	accessToken: string | null
) {
	const response = await fetch(`${BASE_URL}/profile/user`, {
		method: 'PATCH',
		headers: {
			'Content-type': 'application/json',
			Authorization: `Bearer ${accessToken}`,
		},
		credentials: 'include',
		body: JSON.stringify({ name }),
	});

	if (response.status === 403) {
		throw new Error(response.status.toString());
	}

	const result = await response.json();

	return result;
};

export const updateCurrentPassword = async function (
	passwordChanges: { currentPassword: string; newPassword: string },
	accessToken: string | null
) {
	try {
		const response = await fetch(`${BASE_URL}/profile/password`, {
			method: 'PATCH',
			headers: {
				'Content-type': 'application/json',
				Authorization: `Bearer ${accessToken}`,
			},
			credentials: 'include',
			body: JSON.stringify({
				password: passwordChanges.newPassword,
				currentPassword: passwordChanges.currentPassword,
			}),
		});

		const result = await response.json();

		return result;
	} catch (error) {
		console.log(error);
	}
};

export const deleteUser = async function (
	password: string,
	accessToken: string | null
) {
	try {
		const response = await fetch(`${BASE_URL}/profile/user`, {
			method: 'DELETE',
			headers: {
				'Content-type': 'application/json',
				Authorization: `Bearer ${accessToken}`,
			},
			credentials: 'include',
			body: JSON.stringify({
				password,
			}),
		});

		const result = await response.json();

		return result;
	} catch (error) {
		console.log(error);
	}
};

//Cart
export const addToCart = async function (
	itemInfo: CartItem,
	token: string | null
) {
	const response = await fetch(`${BASE_URL}/cart`, {
		method: 'POST',
		headers: {
			'Content-type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
		credentials: 'include',
		body: JSON.stringify({ ...itemInfo }),
	});

	if (response.status === 403) {
		throw new Error(response.status.toString());
	}

	const result = await response.json();

	return result;
};

export const getCartData = async function (accessToken: string | null) {
	const response = await fetch(`${BASE_URL}/cart`, {
		method: 'GET',
		headers: {
			Authorization: `Bearer ${accessToken}`,
		},
		credentials: 'include',
	});

	if (response.status === 403) {
		throw new Error(response.status.toString());
	}

	const result = await response.json();

	return result;
};

export const deleteCartData = async function (
	id: string,
	accessToken: string | null
) {
	const response = await fetch(`${BASE_URL}/cart`, {
		method: 'DELETE',
		headers: {
			Authorization: `Bearer ${accessToken}`,
			'Content-type': 'application/json',
		},
		body: JSON.stringify({ cartItemId: id }),
		credentials: 'include',
	});

	if (response.status === 403) {
		throw new Error(response.status.toString());
	}
};
