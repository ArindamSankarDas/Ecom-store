import { Minus, Plus, Trash2 } from 'lucide-react';

import {
	addToCart,
	deleteCartData,
	logoutUser,
	refreshTokenUser,
} from '@api/apiService';

import { Button } from '@components/ui/button';
import { useCart } from '@context/CartContext';
import { useAuth } from '@context/AuthContext';
import useProductCounter from '@hooks/useProductCounter';
import { useState } from 'react';

type Props = {
	productId?: number;
	cartItemId: string;
	cartItemCategory: string;
	cartItemName: string;
	cartItemPrice: number;
	cartItemThumbnail: string;
	cartItemQty: number;
};

function CartItem({
	productId,
	cartItemId,
	cartItemCategory,
	cartItemName,
	cartItemPrice,
	cartItemThumbnail,
	cartItemQty,
}: Props) {
	const { removeItem, setCart } = useCart();
	const { accessToken, login, logout } = useAuth();
	const [loading, setLoading] = useState(false);

	const { increaseCount, decreaseCount, itemCount } = useProductCounter(
		productId,
		cartItemQty
	);

	async function manageItemCounterRequest(count: 1 | -1) {
		setLoading(true);

		try {
			const cartItem = await addToCart(
				{
					productId,
					productCategory: cartItemCategory,
					productName: cartItemName,
					productPrice: cartItemPrice,
					productThumbnail: cartItemThumbnail,
					productQty: count,
				},
				accessToken
			);

			switch (count) {
				case 1:
					increaseCount();
					break;

				case -1:
					decreaseCount();
					break;

				default:
					console.log('Not an option');
					break;
			}

			if (cartItem.message) {
				alert(cartItem.message);
			}

			setCart(cartItem);
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

				const cartItem = await addToCart(
					{
						productId,
						productCategory: cartItemCategory,
						productName: cartItemName,
						productPrice: cartItemPrice,
						productThumbnail: cartItemThumbnail,
						productQty: count,
					},
					accessToken
				);

				setCart(cartItem);
			}
		} finally {
			setLoading(false);
		}
	}

	async function deleteCartItem() {
		try {
			await deleteCartData(cartItemId, accessToken);

			removeItem(cartItemId);
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

				await deleteCartData(cartItemId, newAccessToken.accessToken);
				removeItem(cartItemId);
			}
		}
	}

	return (
		<div
			id='cart-item'
			className='border-2 rounded-md p-5 flex justify-start items-center gap-3'
		>
			<img
				src={cartItemThumbnail}
				alt='cart-item-image'
				width={120}
				height={120}
				className='rounded-md'
			/>
			<div className='w-full'>
				<h3 className='font-medium'>{cartItemName}</h3>
				<p className='text-sm font-semibold text-gray-500'>
					{cartItemCategory}
				</p>
				<div className='self-end flex justify-between items-center mt-2'>
					<span className='font-bold'>${cartItemPrice}</span>
					<div className='flex justify-center items-center gap-2'>
						<div className='w-fit flex justify-center items-center gap-4 border rounded-lg'>
							<button
								className='border-r py-1 px-2 rounded-tl-lg rounded-bl-lg hover:bg-slate-50 active:bg-white'
								onClick={() => manageItemCounterRequest(-1)}
								disabled={loading || itemCount.currentCount - 1 < 1}
							>
								<Minus size={18} />
							</button>

							<span className='font-semibold select-none'>
								{itemCount.currentCount}
							</span>

							<button
								className='border-l py-1 px-2 rounded-tr-lg rounded-br-lg hover:bg-slate-50 active:bg-white'
								onClick={() => manageItemCounterRequest(1)}
								disabled={
									loading || itemCount.currentCount === itemCount.totalCount
								}
							>
								<Plus size={18} />
							</button>
						</div>
						<Button variant='ghost' size='icon' onClick={deleteCartItem}>
							<Trash2 className='h-4 w-4' />
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
}
export default CartItem;
