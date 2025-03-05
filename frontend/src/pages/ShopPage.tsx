import ProductCard from '@components/ProductCard/ProductCard';

import { ButtonLoading } from '@components/ui/custom-buttons';
import { Outlet, useParams } from 'react-router-dom';
import { useFetchProducts } from '@/hooks/useProducts';

const ShopPage = ({ currentPath }: { currentPath: string }) => {
	const { id } = useParams();

	const { loading, products, setSkipCount } = useFetchProducts(currentPath);

	return (
		<>
			{!id ? (
				loading.pageLoading ? (
					<section className='w-full h-[70vh] relative'>
						<div className='absolute left-[50%] -translate-x-1/2 top-[50%] -translate-y-1/2'>
							<div
								className='animate-spin inline-block size-24 border-[6px] border-current border-t-transparent text-blue-600 rounded-full'
								role='status'
								aria-label='loading'
							></div>
						</div>
					</section>
				) : (
					<section>
						<div className='card-container p-5'>
							{products &&
								products.map((productItem) => (
									<ProductCard
										key={productItem.id}
										itemId={productItem.id}
										itemPrice={productItem.price}
										itemPic={productItem.thumbnail}
										itemTitle={productItem.title}
										itemCategory={productItem.category}
									/>
								))}
						</div>
						{!(products.length < 11) &&
							(loading.buttonLoading ? (
								<ButtonLoading>Please wait</ButtonLoading>
							) : (
								<button
									className='mt-10 mb-7 relative left-1/2 -translate-x-1/2 bg-black text-white px-3 py-1 rounded-md font-semibold border-2 border-black transition-all hover:bg-white hover:text-black active:text-white active:bg-black'
									onClick={() => setSkipCount((prevCount) => prevCount + 11)}
								>
									Load more
								</button>
							))}
					</section>
				)
			) : (
				<Outlet />
			)}
		</>
	);
};
export default ShopPage;
