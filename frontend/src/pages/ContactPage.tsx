import { Mail, Phone } from 'lucide-react';
import { Input } from '@components/ui/input';
import { useAuth } from '@context/AuthContext';
import { useEffect } from 'react';
import {
	getCurrentUser,
	logoutUser,
	refreshTokenUser,
	sendMessage,
} from '@api/apiService';
import { useForm } from 'react-hook-form';

const ContactPage = () => {
	const { accessToken, login, isAuthenticated, logout } = useAuth();
	const {
		formState: { errors },
		handleSubmit,
		getValues,
		register,
		reset,
	} = useForm({
		defaultValues: {
			username: '',
			useremail: '',
			message: '',
		},
	});

	useEffect(() => {
		async function fetchUser() {
			try {
				const currentUser = await getCurrentUser(accessToken);
				reset({ username: currentUser.name, useremail: currentUser.email });
			} catch (error) {
				if ((error as Error).message === '403') {
					const newAccessToken = await refreshTokenUser();
					login(newAccessToken.accessToken);
				}
			}
		}
		fetchUser();
	}, [accessToken, login, reset]);

	const onSubmit = async () => {
		console.log('hello');

		if (!isAuthenticated) {
			alert("You're not logged in");
			return;
		}

		const message = getValues('message');

		if (message.length < 10) {
			alert('Your message should be atleast 15 letters long');
			return;
		}

		try {
			await sendMessage(accessToken, message);
		} catch (error) {
			if ((error as Error).message === '403') {
				const newAccessToken = await refreshTokenUser().catch(async function (
					error
				) {
					if (error.message === '401') {
						await logoutUser();
						logout();
					}

					await sendMessage(newAccessToken.accessToken, message);
					login(newAccessToken.accessToken);
				});
			}
		}
	};

	return (
		<main className='border flex-1 py-5 flex flex-col items-center justify-center gap-7 lg:flex-row lg:px-10 lg:py-28'>
			<section
				id='text-info'
				className='border mx-6 p-8 shadow space-y-8 rounded-lg'
			>
				<section id='call-support' className='space-y-4'>
					<div className='flex items-center gap-2'>
						<span className='bg-black p-2 rounded-full'>
							<Phone color='white' />
						</span>
						<h1 className='font-semibold text-lg'>Call To US</h1>
					</div>
					<div className='font-medium text-sm space-y-1'>
						<p>We are available 24/7, 7 days a week</p>
						<p>Phone: +9876543210</p>
					</div>
				</section>
				<hr />
				<section id='email-support' className='space-y-4'>
					<div className='flex items-center gap-2'>
						<span className='bg-black p-2 rounded-full'>
							<Mail color='white' />
						</span>
						<h1 className='font-semibold text-lg'>Write to US</h1>
					</div>

					<div className='text-sm'>
						<p className='w-3/4'>
							Fill out our form we will contact you within 24 hours
						</p>
					</div>
				</section>
			</section>
			<section
				id='contact-form'
				className='mx-5 px-6 py-8 border rounded-lg shadow flex flex-col gap-4 lg:mx-0'
			>
				<form className='grid-form' onSubmit={handleSubmit(onSubmit)}>
					<div>
						<Input
							type='text'
							placeholder='Your Name'
							className='py-6 bg-gray-100 placeholder:text-gray-400'
							{...register('username', {
								required: 'Username required',
							})}
						/>
						{errors.username && (
							<p className='text-red-500 text-sm font-medium'>
								{String(errors.username.message)}
							</p>
						)}
					</div>
					<div>
						<Input
							type='email'
							placeholder='Your Email'
							autoComplete='off'
							className='py-6 bg-gray-100 placeholder:text-gray-400'
							{...register('useremail', {
								required: 'Useremail required',
							})}
						/>
						{errors.useremail && (
							<p className='text-red-500 text-sm font-medium'>
								{String(errors.useremail.message)}
							</p>
						)}
					</div>

					<textarea
						cols={20}
						rows={5}
						placeholder='Your Message'
						className='resize-none border'
						{...register('message', {
							required: "Message Can't be empty",
						})}
					></textarea>
					{errors.message && (
						<p className='text-red-500 text-sm font-medium'>
							{String(errors.message.message)}
						</p>
					)}
					<button
						type='submit'
						className='w-fit self-end bg-black border text-white px-6 py-2 rounded-md font-semibold hover:cursor-pointer hover:bg-white hover:text-black transition-all active:bg-gray-200 shadow-md'
					>
						Send Message
					</button>
				</form>
			</section>
		</main>
	);
};
export default ContactPage;
