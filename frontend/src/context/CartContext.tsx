import {
	useContext,
	createContext,
	ReactNode,
	useState,
	useEffect,
} from 'react';
import { useAuth } from '@context/AuthContext';
import { getCartData } from '@api/apiService';
import { CartItem } from '@lib/types';

type CartContextItem = CartItem & {
	id: string;
	productId: number;
};

type Props = {
	children: ReactNode;
};

type CartContextType = {
	cartItems: CartContextItem[] | undefined;
	setCart: (items: CartContextItem) => void;
	removeItem: (itemId: string) => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: Props) {
	const { accessToken } = useAuth();
	const [cartItems, setCartItems] = useState<CartContextItem[] | undefined>(
		undefined
	);

	useEffect(() => {
		if (accessToken) {
			getCartData(accessToken).then((data) => {
				setCartItems([...data.cart]);
			});
		}
	}, [accessToken]);

	const setCart = (item: CartContextItem) => {
		setCartItems((prevState) => {
			const filteredData = prevState?.filter(function (elem) {
				return elem.productName !== item.productName;
			});

			return [item, ...(filteredData ?? [])];
		});
	};

	const removeItem = (itemId: string) => {
		setCartItems((prevState) => {
			const filteredData = prevState?.filter(function (elem) {
				return elem.id !== itemId;
			});

			return [...(filteredData ?? [])];
		});
	};

	const value: CartContextType = {
		cartItems,
		setCart,
		removeItem,
	};

	return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export const useCart = () => {
	const context = useContext(CartContext);
	if (!context) {
		throw new Error('useCart must be used within a CartProvider');
	}
	return context;
};
