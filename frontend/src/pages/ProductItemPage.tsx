import clsx from 'clsx';
import { ChevronLeft, Minus, Plus, RefreshCw, Star, Truck } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@components/ui/button';
import { useFetchProductItem } from '@hooks/useProducts';

const ProductItemPage = () => {
	const navigate = useNavigate();
	const { id } = useParams();

	const { productDetails, reviews } = useFetchProductItem(id);

	return (
		<div
			id='single-product-page'
			className='flex flex-col px-5 py-10 gap-5 lg:pb-20'
		>
			<Button
				className='w-fit py-5 text-lg md:ml-20 lg:ml-5'
				size={'sm'}
				onClick={() => navigate(-1)}
			>
				<ChevronLeft />
				Back
			</Button>
			<section className='flex flex-col gap-10 lg:flex-row md:justify-center md:items-center'>
				<img
					src={productDetails?.thumbnail}
					alt={`${productDetails?.title} image`}
					className='w-full h-auto border-2 rounded-md md:w-[560px]  lg:min-w-[500px]'
				/>

				<div id='product-item-details' className='md:max-w-xl'>
					<section id='header-and-review'>
						<h1 className='text-3xl font-bold'>{productDetails?.title}</h1>
						<div id='review-info' className='mt-5 flex items-center gap-7'>
							<div className='flex'>
								{Array.from({ length: reviews.totalReviewStars }, (_, index) =>
									reviews.averageReviewsCount <= index ? (
										<Star key={index} />
									) : (
										<Star key={index} fill='black' />
									)
								)}
							</div>

							<p className=' review-bar relative text-gray-400 font-semibold'>
								&#40;{productDetails?.reviews.length} reviews&#41;
							</p>
							<p
								className={clsx(
									'font-bold text-sm relative top-[1px]',
									productDetails?.availabilityStatus === 'In Stock'
										? 'text-green-500'
										: productDetails?.availabilityStatus === 'Low Stock'
										? 'text-yellow-500'
										: 'text-red-500'
								)}
							>
								{productDetails?.availabilityStatus}
							</p>
						</div>
					</section>
					<section id='price-and-description' className='mt-6'>
						<span className='text-2xl font-bold'>${productDetails?.price}</span>
						<p className='mt-3 text-gray-500 font-medium'>
							{productDetails?.description}
						</p>
					</section>
					<section
						id='counter-and-addCart'
						className='flex items-center gap-3 mt-6'
					>
						<div className='w-fit flex justify-center items-center gap-4 border rounded-lg'>
							<button className='border-r py-2 px-3 rounded-tl-lg rounded-bl-lg hover:bg-slate-50 active:bg-white'>
								<Minus size={22} />
							</button>

							<span className='text-xl font-semibold select-none'>12</span>

							<button className='border-l py-2 px-3 rounded-tr-lg rounded-br-lg hover:bg-slate-50 active:bg-white'>
								<Plus size={22} />
							</button>
						</div>
						<button className='w-full px-8 py-[7px] transition-all font-semibold border border-black rounded-lg bg-black text-white hover:text-black hover:bg-white hover:border-gray-300 active:bg-black active:text-white md:px-3 lg:w-fit'>
							Add to cart
						</button>
					</section>
					<section
						id='returns-and-delivery'
						className='mt-10 border px-5 py-4 rounded-lg'
					>
						<h1 className='mb-4 text-xl font-semibold'>Shipping & Returns</h1>

						<section className='space-y-5'>
							<div className='flex gap-3'>
								<Truck size={25} />
								<div className='flex flex-col'>
									<span className='font-semibold'>Free Delivery</span>
									<span className='text-sm font-semibold text-gray-500'>
										{productDetails?.shippingInformation}
									</span>
								</div>
							</div>
							<div className='flex gap-3'>
								<RefreshCw size={25} />
								<div className='flex flex-col'>
									<span className='font-semibold'>Return Policy</span>
									<span className='text-sm font-semibold text-gray-500'>
										{productDetails?.returnPolicy}
									</span>
								</div>
							</div>
							<div className='flex gap-3'>
								<Truck size={25} />
								<div className='flex flex-col'>
									<span className='font-semibold'>Warranty Availability</span>
									<span className='text-sm font-semibold text-gray-500'>
										{productDetails?.warrantyInformation}
									</span>
								</div>
							</div>
						</section>
					</section>
				</div>
			</section>
		</div>
	);
};
export default ProductItemPage;
