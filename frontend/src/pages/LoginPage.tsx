import { loginFormData } from '@/lib/types';

import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/card';
import { Label } from '@components/ui/label';
import { Input } from '@components/ui/input';
import { Button } from '@components/ui/button';

import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { loginUser } from '@/api/apiService';

const LoginPage = () => {
	const {
		formState: { errors },
		register,
		handleSubmit,
		reset,
	} = useForm<loginFormData>({
		defaultValues: {
			email: '',
			password: '',
		},
	});

	const onSubmint = function (signInData: loginFormData) {
		loginUser(signInData).then((data) => {
			console.log(data);
		});

		reset();
	};

	return (
		<main className='flex-1 flex justify-center items-center py-10 px-3 md:py-20'>
			<Card className='w-full max-w-md shadow'>
				<CardHeader>
					<CardTitle className='text-2xl text-center font-bold'>
						Login to Your Account
					</CardTitle>
				</CardHeader>

				<CardContent>
					<form onSubmit={handleSubmit(onSubmint)} className='space-y-5'>
						<div className='space-y-2'>
							<Label htmlFor='email' className='font-semibold text-base'>
								Email:
							</Label>
							<Input
								id='email'
								type='email'
								autoComplete='off'
								placeholder='Enter your email'
								className='py-5'
								{...register('email', {
									required: 'Email required',

									pattern: {
										value:
											/^[a-zA-Z0-9][\w+%-_]{4,}@([a-zA-Z0-9-_]+\.)+[a-zA-Z]{2,}$/g,
										message: 'Invalid email pattern',
									},
								})}
							/>
							{errors.email && (
								<p className='text-red-500 text-sm font-medium'>
									{String(errors.email.message)}
								</p>
							)}
						</div>

						<div className='space-y-2'>
							<Label htmlFor='password' className='font-semibold text-base'>
								Password:
							</Label>
							<Input
								id='password'
								type='password'
								placeholder='Enter your password'
								className='py-5'
								{...register('password', {
									required: 'Password is required',

									pattern: {
										value:
											/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[+-_])[a-zA-Z0-9-+_]{6,12}/g,
										message: `
											✅ Must be 6 to 12 characters long
											✅ Must contain at least one lowercase letter (a-z)
											✅ Must contain at least one uppercase letter (A-Z)
											✅ Must contain at least one digit (0-9)
											✅ Must include at least one special character (+, -, or _)
											✅ Can only have letters, numbers, and the special characters (+, -, _)
										`,
									},
								})}
							/>
							{errors.password && (
								<p className='text-red-500 text-sm font-medium'>
									{String(errors.password.message)}
								</p>
							)}
						</div>

						<Button type='submit' className='w-full text-base py-5'>
							Sign In
						</Button>
					</form>

					<div className='mt-4 text-center text-sm'>
						<a href='#' className='hover:underline text-gray-600 font-medium'>
							Forgot your password?
						</a>
					</div>

					<p className='mt-6 text-center text-sm text-gray-500'>
						Don't have an account?{' '}
						<Link
							to='/signup'
							className='font-medium text-black hover:underline'
						>
							Sign Up
						</Link>
					</p>
				</CardContent>
			</Card>
		</main>
	);
};
export default LoginPage;
