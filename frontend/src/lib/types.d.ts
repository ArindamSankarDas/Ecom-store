export type ProductItem = {
	id: number;
	title: string;
	thumbnail: string;
	price: number;
	category: string;
};

export type SearchItem = {
	id: number;
	title: string;
	category: string;
};

export type ProductItemDetails = {
	thumbnail: string;
	title: string;
	stock: number;
	reviews: {
		rating: number;
	}[];
	availabilityStatus: 'In Stock' | 'Low Stock' | 'No Stock';
	price: number;
	description: string;
	returnPolicy: string;
	warrantyInformation: string;
	shippingInformation: string;
};

export type SignUpFormData = {
	name: string;
	email: string;
	password: string;
	confirmPassword: string;
};

export type loginFormData = {
	email: string;
	password: string;
};

export type AuthState = {
	accessToken: string | null;
	login: (token: string) => void;
	logout: () => void;
	isAuthenticated: boolean;
};
