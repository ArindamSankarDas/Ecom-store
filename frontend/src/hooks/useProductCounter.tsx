import { useState, useEffect } from 'react';
import { useFetchProductItem } from '@hooks/useProducts';
import { addToCart, refreshTokenUser } from '@api/apiService';
import { useCart } from '@context/CartContext';
import { useAuth } from '@context/AuthContext';

function useProductCounter(productId?: number, cartItemQty?: number) {
	const { accessToken, isAuthenticated, login } = useAuth();
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

	function submitToCart() {
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

		addToCart(
			{
				productId,
				productCategory: productDetails.category,
				productThumbnail: productDetails.thumbnail,
				productName: productDetails.title,
				productPrice: productDetails.price,
				productQty: itemCount.currentCount,
			},
			accessToken
		)
			.then((data) => {
				setCart(data);
			})
			.catch(function (error) {
				if (error.message === '403') {
					refreshTokenUser().then(function (data) {
						login(data.accessToken);
						addToCart(
							{
								productId,
								productCategory: productDetails.category,
								productThumbnail: productDetails.thumbnail,
								productName: productDetails.title,
								productPrice: productDetails.price,
								productQty: itemCount.currentCount,
							},
							accessToken
						).then((data) => {
							setCart(data);
						});
					});
				}
			});
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
