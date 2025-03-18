import { Button } from '@components/ui/button';
import { Input } from '@components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/card';
import { Label } from '@components/ui/label';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useForm, useWatch } from 'react-hook-form';
import { SignUpFormData } from '@lib/types';
import { signUpUser } from '@api/apiService';
import { useAuth } from '@context/AuthContext';

const SignUpPage = () => {
	const { login, isAuthenticated } = useAuth();
	const navigate = useNavigate();

	const {
		register,
		control,
		formState: { errors },
		handleSubmit,
		reset,
	} = useForm<SignUpFormData>({
		defaultValues: {
			name: '',
			email: '',
			password: '',
			confirmPassword: '',
		},
	});

	const password = useWatch({ control, name: 'password' });

	const onSubmit = function (signUpData: SignUpFormData) {
		signUpUser(signUpData)
			.then(function (data: { accessToken: string }) {
				login(data.accessToken);
			})
			.then(function () {
				reset();
				navigate('/shop');
			});
	};

	return isAuthenticated ? (
		<Navigate to={'/shop'} />
	) : (
		<main className='flex-1 flex justify-center items-center py-10 px-3 md:py-14'>
			<Card className='w-full max-w-md shadow'>
				<CardHeader>
					<CardTitle className='text-2xl text-center font-bold'>
						Create a New Account
					</CardTitle>
				</CardHeader>

				<CardContent>
					<form onSubmit={handleSubmit(onSubmit)} className='space-y-5'>
						<div className='space-y-2'>
							<Label htmlFor='name' className='font-semibold text-base'>
								Name:
							</Label>
							<Input
								id='name'
								type='text'
								placeholder='Enter your name'
								className='py-5'
								{...register('name', {
									required: 'Name is required',
									minLength: {
										value: 3,
										message: 'Name must have atleast 3 characters',
									},
								})}
							/>

							{errors.name && (
								<p className='text-red-500 text-sm font-medium'>
									{String(errors.name.message)}
								</p>
							)}
						</div>
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
									required: 'Email is required',
									pattern: {
										value:
											/^[a-zA-Z0-9][\w%+-]{4,}@([a-zA-Z0-9]+\.)+[a-zA-Z]{2,}$/g,
										message: 'Invalid email format',
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
											/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[+-_])[a-zA-Z0-9-_+]{6,12}/g,
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
						<div className='space-y-2'>
							<Label
								htmlFor='confirmPassword'
								className='font-semibold text-base'
							>
								Confirm Password:
							</Label>
							<Input
								id='confirmPassword'
								type='password'
								placeholder='Enter your password'
								className='py-5'
								{...register('confirmPassword', {
									required: 'Confirm password is required',
									validate: (value) =>
										value === password || 'Passwords do not match',
								})}
							/>
							{errors.confirmPassword && (
								<p className='text-red-500 text-sm font-medium'>
									{String(errors.confirmPassword.message)}
								</p>
							)}
						</div>

						<Button type='submit' className='w-full text-base py-5'>
							Sign Up
						</Button>
					</form>

					<p className='mt-6 text-center text-sm text-gray-500'>
						Already have an account?
						<Link
							to='/login'
							className='font-medium text-black hover:underline'
						>
							Sign In
						</Link>
					</p>
				</CardContent>
			</Card>
		</main>
	);
};
export default SignUpPage;
