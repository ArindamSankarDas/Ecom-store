import {
	deleteUser,
	getCurrentUser,
	updateCurrentPassword,
	updateCurrentUser,
	logoutUser,
	refreshTokenUser,
} from '@api/apiService';
import { Button } from '@components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@components/ui/card';
import { Input } from '@components/ui/input';
import { Label } from '@components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@components/ui/tabs';
import { useAuth } from '@context/AuthContext';
import { useEffect, useState } from 'react';

function ProfilePage() {
	const [userName, setUserName] = useState('');
	const [passwordChanges, setPasswordChanges] = useState({
		currentPassword: '',
		newPassword: '',
	});
	const [deletePassword, setDeletePassword] = useState('');

	const { accessToken, logout, login } = useAuth();

	useEffect(() => {
		async function fetchUser() {
			try {
				const data = await getCurrentUser(accessToken);
				setUserName(data.name);
			} catch (error) {
				if (error.message === '403') {
					const data = await refreshTokenUser();
					login(data.accessToken);
				}
			}
		}
		fetchUser();
	}, [accessToken]);

	const handleSaveName = async () => {
		try {
			await updateCurrentUser(userName, accessToken);
		} catch (error) {
			if (error.message === '403') {
				const data = await refreshTokenUser();

				await updateCurrentUser(userName, accessToken);
				login(data.accessToken);
			}
		}
	};

	const handleSavePassword = async () => {
		try {
			await updateCurrentPassword(passwordChanges, accessToken);
			setPasswordChanges({ currentPassword: '', newPassword: '' });
		} catch (error) {
			if (error.message === '403') {
				const data = await refreshTokenUser();

				await updateCurrentPassword(passwordChanges, accessToken);
				setPasswordChanges({ currentPassword: '', newPassword: '' });
				login(data.accessToken);
			}
		}
	};

	const handleDeleteAccount = async () => {
		try {
			await deleteUser(deletePassword, accessToken);
			setDeletePassword('');
			await logoutUser();
			logout();
		} catch (error) {
			if (error.message === '403') {
				const data = await refreshTokenUser();

				await deleteUser(deletePassword, data.accessToken);
				setPasswordChanges({ currentPassword: '', newPassword: '' });

				await logoutUser();
				logout();
			} else {
				console.log(error);
			}
		}
	};

	return (
		<div className='py-20 w-full flex justify-center items-center'>
			<Tabs defaultValue='account' className='w-[400px]'>
				<TabsList className='grid w-full grid-cols-3'>
					<TabsTrigger value='account'>Account</TabsTrigger>
					<TabsTrigger value='password'>Password</TabsTrigger>
					<TabsTrigger value='delete'>Delete</TabsTrigger>
				</TabsList>

				<TabsContent value='account'>
					<Card>
						<CardHeader>
							<CardTitle>Account</CardTitle>
							<CardDescription>
								Update your account details here.
							</CardDescription>
						</CardHeader>
						<CardContent className='space-y-2'>
							<div className='space-y-1'>
								<Label htmlFor='name'>Name</Label>
								<Input
									id='name'
									value={userName}
									onChange={(e) => setUserName(e.target.value)}
								/>
							</div>
						</CardContent>
						<CardFooter>
							<Button onClick={handleSaveName}>Save changes</Button>
						</CardFooter>
					</Card>
				</TabsContent>

				<TabsContent value='password'>
					<Card>
						<CardHeader>
							<CardTitle>Password</CardTitle>
							<CardDescription>Change your password here.</CardDescription>
						</CardHeader>
						<CardContent className='space-y-2'>
							<div className='space-y-1'>
								<Label htmlFor='current'>Current password</Label>
								<Input
									id='current'
									type='password'
									value={passwordChanges.currentPassword}
									onChange={(e) =>
										setPasswordChanges((prev) => ({
											...prev,
											currentPassword: e.target.value,
										}))
									}
								/>
							</div>
							<div className='space-y-1'>
								<Label htmlFor='new'>New password</Label>
								<Input
									id='new'
									type='password'
									value={passwordChanges.newPassword}
									onChange={(e) =>
										setPasswordChanges((prev) => ({
											...prev,
											newPassword: e.target.value,
										}))
									}
								/>
							</div>
						</CardContent>
						<CardFooter>
							<Button onClick={handleSavePassword}>Save password</Button>
						</CardFooter>
					</Card>
				</TabsContent>

				<TabsContent value='delete'>
					<Card>
						<CardHeader>
							<CardTitle>Delete Account</CardTitle>
							<CardDescription>
								Confirm deletion by entering your password.
							</CardDescription>
						</CardHeader>
						<CardContent>
							<div className='space-y-1'>
								<Label htmlFor='delete'>Confirm password</Label>
								<Input
									id='delete'
									type='password'
									value={deletePassword}
									onChange={(e) => setDeletePassword(e.target.value)}
								/>
							</div>
						</CardContent>
						<CardFooter className='flex justify-end'>
							<Button variant='destructive' onClick={handleDeleteAccount}>
								Delete Account
							</Button>
						</CardFooter>
					</Card>
				</TabsContent>
			</Tabs>
		</div>
	);
}

export default ProfilePage;
