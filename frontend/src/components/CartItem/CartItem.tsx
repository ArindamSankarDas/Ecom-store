import { Button } from '@components/ui/button';
import { Minus, Plus, Trash2 } from 'lucide-react';

type CartItemProps = {
	productName: string;
	productCategory: string;
	productPrice: number;
	productQty: number;
	productThumbnail: string;
};

const CartItem = ({
	productName,
	productCategory,
	productPrice,
	productQty,
	productThumbnail,
}: CartItemProps) => {
	return (
		<div
			id='cart-item'
			className='border-2 rounded-md p-5 flex justify-start items-center gap-3'
		>
			<img
				src={productThumbnail}
				alt='cart-item-image'
				width={120}
				height={120}
				className='rounded-md'
			/>
			<div className='w-full'>
				<h3 className='font-medium'>{productName}</h3>
				<p className='text-sm font-semibold text-gray-500'>
					{productCategory}
				</p>{' '}
				<div className='self-end flex justify-between items-center mt-2'>
					<span className='font-bold'>${productPrice}</span>
					<div className='flex justify-center items-center gap-2'>
						<div className='w-fit flex justify-center items-center gap-4 border rounded-lg'>
							<button className='border-r py-1 px-2 rounded-tl-lg rounded-bl-lg hover:bg-slate-50 active:bg-white'>
								<Minus size={18} />
							</button>

							<span className='font-semibold select-none'>{productQty}</span>

							<button className='border-l py-1 px-2 rounded-tr-lg rounded-br-lg hover:bg-slate-50 active:bg-white'>
								<Plus size={18} />
							</button>
						</div>
						<Button variant='ghost' size='icon'>
							<Trash2 className='h-4 w-4' />
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
};
export default CartItem;
