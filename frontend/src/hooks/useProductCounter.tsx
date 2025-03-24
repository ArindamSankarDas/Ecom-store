import { useState, useEffect } from 'react';
import { useFetchProductItem } from '@hooks/useProducts';
import { addToCart, logoutUser, refreshTokenUser } from '@api/apiService';
import { useCart } from '@context/CartContext';
import { useAuth } from '@context/AuthContext';

function useProductCounter(productId?: number, cartItemQty?: number) {
	const { accessToken, isAuthenticated, login, logout } = useAuth();
	const { setCart } = useCart();

	const { productDetails, reviews } = useFetchProductItem(productId);

	const [itemCount, setItemCount] = useState({
		currentCount: productDetails?.stock ? cartItemQty || 1 : 0,
		totalCount: productDetails?.stock || 0,
	});

	useEffect(() => {
		if (productDetails?.stock !== undefined) {
			setItemCount(function (prevstate) {
				return {
					...prevstate,
					currentCount: cartItemQty || 1,
					totalCount: productDetails.stock,
				};
			});
		}
	}, [productDetails?.stock, cartItemQty]);

	function increaseCount() {
		if (itemCount.currentCount + 1 > itemCount.totalCount) return;

		setItemCount(function (prevstate) {
			return {
				...prevstate,
				currentCount: prevstate.currentCount + 1,
			};
		});
	}

	function decreaseCount() {
		if (itemCount.currentCount - 1 < 1) return;

		setItemCount(function (prevstate) {
			return {
				...prevstate,
				currentCount: prevstate.currentCount - 1,
			};
		});
	}

	async function submitToCart() {
		try {
			if (!isAuthenticated) {
				alert('Please login first');
				return;
			}

			if (
				!(
					productDetails?.title &&
					productDetails?.price &&
					productDetails?.thumbnail &&
					productDetails?.thumbnail &&
					productDetails?.category
				)
			) {
				alert('Property on product not present');
				return;
			}

			const cartItemData = await addToCart(
				{
					productId,
					productCategory: productDetails.category,
					productThumbnail: productDetails.thumbnail,
					productName: productDetails.title,
					productPrice: productDetails.price,
					productQty: itemCount.currentCount,
				},
				accessToken
			);

			setCart(cartItemData);
		} catch (error) {
			if ((error as Error).message === '403') {
				const newAccessToken = await refreshTokenUser().catch(async function (
					error
				) {
					if (error.message === '401') {
						await logoutUser();
						logout();
					}
				});

				login(newAccessToken.accessToken);

				if (
					!(
						productDetails?.title &&
						productDetails?.price &&
						productDetails?.thumbnail &&
						productDetails?.thumbnail &&
						productDetails?.category
					)
				) {
					alert('Property on product not present');
					return;
				}
				const cartItemData = await addToCart(
					{
						productId,
						productCategory: productDetails.category,
						productThumbnail: productDetails.thumbnail,
						productName: productDetails.title,
						productPrice: productDetails.price,
						productQty: itemCount.currentCount,
					},
					accessToken
				);
				setCart(cartItemData);
			}
		}
	}

	return {
		submitToCart,
		increaseCount,
		decreaseCount,
		productDetails,
		reviews,
		itemCount,
	};
}

export default useProductCounter;
