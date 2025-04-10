import { Button } from '@components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@components/ui/card';
import { Check } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';

function PaymentPage() {
	const { orderId } = useParams();
	const navigate = useNavigate();

	return (
		<div className='flex min-h-screen items-center justify-center bg-gray-50 p-4'>
			<Card className='w-full max-w-md'>
				<CardHeader className='text-center'>
					<div className='mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100'>
						<Check className='h-8 w-8 text-green-600' />
					</div>
					<CardTitle className='text-2xl'>Order Placed!</CardTitle>
					<CardDescription className='text-base'>
						Thank you for your order. We'll notify you if any changes occur.
					</CardDescription>
				</CardHeader>
				<CardContent className='space-y-4'>
					<div className='rounded-md bg-gray-100 p-4'>
						<p className='text-sm font-medium text-gray-700'>
							Order #{orderId}
						</p>
						<p className='text-sm text-gray-500'>
							Placed on {new Date().toLocaleDateString()}
						</p>
					</div>
				</CardContent>
				<CardFooter className='flex justify-center'>
					<Button onClick={() => navigate('/shop')}>Go Back To Shop</Button>
				</CardFooter>
			</Card>
		</div>
	);
}

export default PaymentPage;
