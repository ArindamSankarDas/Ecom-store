import { Minus, Plus, Trash2 } from 'lucide-react';

import { addToCart, deleteCartData } from '@api/apiService';

import { Button } from '@components/ui/button';
import { useCart } from '@context/CartContext';
import { useAuth } from '@context/AuthContext';
import useProductCounter from '@hooks/useProductCounter';

type Props = {
	productId: number;
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
	const { accessToken } = useAuth();

	const { increaseCount, decreaseCount, itemCount } = useProductCounter(
		productId,
		cartItemQty
	);

	function add() {
		increaseCount();

		addToCart(
			{
				productCategory: cartItemCategory,
				productName: cartItemName,
				productPrice: cartItemPrice,
				productThumbnail: cartItemThumbnail,
				productQty: itemCount.currentCount,
			},
			accessToken
		).then(function (data) {
			setCart({ ...data, productId });
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
							<button className='border-r py-1 px-2 rounded-tl-lg rounded-bl-lg hover:bg-slate-50 active:bg-white'>
								<Minus size={18} onClick={decreaseCount} />
							</button>

							<span className='font-semibold select-none'>
								{itemCount.currentCount}
							</span>

							<button
								className='border-l py-1 px-2 rounded-tr-lg rounded-br-lg hover:bg-slate-50 active:bg-white'
								onClick={add}
							>
								<Plus size={18} />
							</button>
						</div>
						<Button
							variant='ghost'
							size='icon'
							onClick={function () {
								deleteCartData(cartItemId, accessToken).then(function () {
									removeItem(cartItemId);
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
