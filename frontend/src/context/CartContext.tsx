import {
	useContext,
	createContext,
	ReactNode,
	useState,
	useEffect,
} from 'react';
import { useAuth } from '@context/AuthContext';
import { getCartData, logoutUser, refreshTokenUser } from '@api/apiService';
import { CartItem } from '@lib/types';

export type CartContextItem = CartItem & {
	id: string;
};

type Props = {
	children: ReactNode;
};

type CartContextType = {
	cartItems: CartContextItem[] | undefined;
	setCart: (items: CartContextItem) => void;
	removeItem: (itemId: string) => void;
	removeAllItems: (emptyCart: []) => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: Props) {
	const { accessToken, login, logout } = useAuth();
	const [cartItems, setCartItems] = useState<CartContextItem[] | []>([]);

	useEffect(() => {
		if (accessToken) {
			(async function () {
				try {
					const currentUserCartData = await getCartData(accessToken);

					setCartItems([...currentUserCartData.cart]);
				} catch (error) {
					if ((error as Error).message === '403') {
						const newAccessToken = await refreshTokenUser().catch(
							async function (error) {
								if (error.message === '401') {
									await logoutUser();
									logout();
								}
							}
						);

						login(newAccessToken.accessToken);
					}
				}
			})();
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

	const removeAllItems = (emptyCart: []) => {
		setCartItems(emptyCart);
	};

	const value: CartContextType = {
		cartItems,
		setCart,
		removeItem,
		removeAllItems,
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
