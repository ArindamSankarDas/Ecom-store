import { ReactNode } from 'react';

type Props = {
	children: ReactNode;
};

function ProductGrid({ children }: Props) {
	return <div className='card-container p-5'>{children}</div>;
}
export default ProductGrid;
