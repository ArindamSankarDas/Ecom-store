import { Button } from '@components/ui/button';
import CartItem from '@components/CartItem/CartItem';
import { Card, CardContent } from '@components/ui/card';

import { useCart } from '@context/CartContext';

function CartPage() {
	const { cartItems } = useCart();

	return (
		<main className='flex-1 px-4 py-10 lg:px-20 lg:pb-32'>
			<h1 className='text-3xl font-bold mb-5 lg:text-4xl lg:mb-7'>Your Cart</h1>

			<section id='cart-body' className='w-full lg:flex lg:gap-5'>
				<section
					id='cart-items-container'
					className='flex flex-col gap-2 lg:flex-1'
				>
					{cartItems?.map(function (elem) {
						return (
							<CartItem
								key={elem.id}
								productCategory={elem.productCategory}
								productName={elem.productName}
								productPrice={elem.productPrice}
								productQty={elem.productQty}
								productThumbnail={elem.productThumbnail}
							/>
						);
					})}
				</section>

				<section
					id='cart-checkout'
					className='mt-6 lg:mt-0 lg:w-[300px] xl:w-[400px]'
				>
					<Card>
						<CardContent className='p-4'>
							<h2 className='text-lg font-bold mb-4'>Order Summary</h2>
							<div className='space-y-2'>
								<div className='flex justify-between'>
									<span>Subtotal</span>
									<span>$39.97</span>
								</div>
								<div className='flex justify-between'>
									<span>Shipping</span>
									<span>$5.00</span>
								</div>
								<div className='flex justify-between font-bold'>
									<span>Total</span>
									<span>$44.97</span>
								</div>
							</div>
							<Button className='w-full mt-4 bg-black text-white hover:bg-gray-800'>
								Proceed to Checkout
							</Button>
						</CardContent>
					</Card>
				</section>
			</section>
		</main>
	);
}
export default CartPage;
