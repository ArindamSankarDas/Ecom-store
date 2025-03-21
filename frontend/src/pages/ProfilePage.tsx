import {
	deleteUser,
	getCurrentUser,
	updateCurrentPassword,
	updateCurrentUser,
	logoutUser,
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

	const { accessToken } = useAuth();
	const { logout } = useAuth();

	useEffect(
		function () {
			getCurrentUser(accessToken).then(function name(data) {
				setUserName(data.name);
			});
		},
		[accessToken]
	);

	function saveNameChanges() {
		updateCurrentUser(userName, accessToken);
	}

	function savePasswordChanges() {
		updateCurrentPassword(passwordChanges, accessToken).then(function () {
			setPasswordChanges({
				currentPassword: '',
				newPassword: '',
			});
		});
	}

	function confirmDeleteAccount() {
		deleteUser(deletePassword, accessToken)
			.then(function (data) {
				
				console.log(data);
				setDeletePassword('');
			})
			.then(function () {
				logoutUser().then(function () {
					logout();
				});
			});
	}

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
								Make changes to your account here. Click save when you're done.
							</CardDescription>
						</CardHeader>
						<CardContent className='space-y-2'>
							<div className='space-y-1'>
								<Label htmlFor='name'>Name</Label>
								<Input
									id='name'
									defaultValue={userName}
									onChange={(e) => {
										setUserName(e.target.value);
									}}
								/>
							</div>
						</CardContent>
						<CardFooter>
							<Button onClick={saveNameChanges}>Save changes</Button>
						</CardFooter>
					</Card>
				</TabsContent>
				<TabsContent value='password'>
					<Card>
						<CardHeader>
							<CardTitle>Password</CardTitle>
							<CardDescription>
								Change your password here. After saving, you'll be logged out.
							</CardDescription>
						</CardHeader>
						<CardContent className='space-y-2'>
							<div className='space-y-1'>
								<Label htmlFor='current'>Current password</Label>
								<Input
									id='current'
									type='password'
									onChange={(e) => {
										setPasswordChanges(function (prevState) {
											return {
												...prevState,
												currentPassword: e.target.value,
											};
										});
									}}
								/>
							</div>
							<div className='space-y-1'>
								<Label htmlFor='new'>New password</Label>
								<Input
									id='new'
									type='password'
									onChange={(e) => {
										setPasswordChanges(function (prevState) {
											return {
												...prevState,
												newPassword: e.target.value,
											};
										});
									}}
								/>
							</div>
						</CardContent>
						<CardFooter>
							<Button onClick={savePasswordChanges}>Save password</Button>
						</CardFooter>
					</Card>
				</TabsContent>
				<TabsContent value='delete'>
					<Card>
						<CardHeader>
							<CardTitle>Delete Account</CardTitle>
							<CardDescription>
								Once you delete your account, there is no going back. Please be
								certain.
							</CardDescription>
						</CardHeader>
						<CardContent>
							<div className='space-y-1'>
								<Label htmlFor='new'>Confirm password</Label>
								<Input
									id='new'
									type='password'
									onChange={(e) => {
										setDeletePassword(e.target.value);
									}}
								/>
							</div>
						</CardContent>
						<CardFooter className='flex justify-end'>
							<Button variant='destructive' onClick={confirmDeleteAccount}>
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
