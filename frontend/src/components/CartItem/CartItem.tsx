import { Minus, Plus, Trash2 } from 'lucide-react';

import { addToCart, deleteCartData, refreshTokenUser } from '@api/apiService';

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
	const { accessToken, login } = useAuth();
	const [loading, setLoading] = useState(false);

	const { increaseCount, decreaseCount, itemCount } = useProductCounter(
		productId,
		cartItemQty
	);

	function add() {
		setLoading(true);

		addToCart(
			{
				productId,
				productCategory: cartItemCategory,
				productName: cartItemName,
				productPrice: cartItemPrice,
				productThumbnail: cartItemThumbnail,
				productQty: 1,
			},
			accessToken
		)
			.then(function (data) {
				increaseCount();

				return data;
			})
			.then(function (data) {
				if (data.msg) {
					alert(data.msg);
					return;
				}

				setCart(data);
			})
			.catch(function (error) {
				if (error.message === '403') {
					refreshTokenUser().then(function (data) {
						login(data.accessToken);
						addToCart(
							{
								productId,
								productCategory: cartItemCategory,
								productName: cartItemName,
								productPrice: cartItemPrice,
								productThumbnail: cartItemThumbnail,
								productQty: 1,
							},
							data.accessToken
						).then((data) => {
							setCart(data);
						});
					});
				}
			})
			.finally(function () {
				setLoading(false);
			});
	}

	function sub() {
		setLoading(true);

		addToCart(
			{
				productId,
				productCategory: cartItemCategory,
				productName: cartItemName,
				productPrice: cartItemPrice,
				productThumbnail: cartItemThumbnail,
				productQty: -1,
			},
			accessToken
		)
			.then(function (data) {
				decreaseCount();

				return data;
			})
			.then(function (data) {
				if (data.msg) {
					alert(data.msg);
					return;
				}

				setCart(data);
			})
			.catch(function (error) {
				if (error.message === '403') {
					refreshTokenUser().then(function (data) {
						login(data.accessToken);
						addToCart(
							{
								productId,
								productCategory: cartItemCategory,
								productName: cartItemName,
								productPrice: cartItemPrice,
								productThumbnail: cartItemThumbnail,
								productQty: -1,
							},
							data.accessToken
						).then((data) => {
							setCart(data);
						});
					});
				}
			})
			.finally(function () {
				setLoading(false);
			});
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
								onClick={sub}
								disabled={loading || itemCount.currentCount - 1 < 1}
							>
								<Minus size={18} onClick={decreaseCount} />
							</button>

							<span className='font-semibold select-none'>
								{itemCount.currentCount}
							</span>

							<button
								className='border-l py-1 px-2 rounded-tr-lg rounded-br-lg hover:bg-slate-50 active:bg-white'
								onClick={add}
								disabled={
									loading || itemCount.currentCount === itemCount.totalCount
								}
							>
								<Plus size={18} />
							</button>
						</div>
						<Button
							variant='ghost'
							size='icon'
							onClick={function () {
								deleteCartData(cartItemId, accessToken)
									.then(function () {
										removeItem(cartItemId);
									})
									.catch(function (error) {
										if (error.message === '403') {
											refreshTokenUser().then(function (data) {
												login(data.accessToken);

												deleteCartData(cartItemId, data.accessToken).then(
													function () {
														removeItem(cartItemId);
													}
												);
											});
										}
									});
							}}
						>
							<Trash2 className='h-4 w-4' />
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
}
export default CartItem;
