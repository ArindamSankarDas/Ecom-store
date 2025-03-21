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

function ProfilePage() {
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
								<Input id='name' defaultValue='Arindam Sankar Das' />
							</div>
							<div className='space-y-1'>
								<Label htmlFor='email'>Email</Label>
								<Input
									id='email'
									type='email'
									defaultValue='arindam@gmail.com'
								/>
							</div>
						</CardContent>
						<CardFooter>
							<Button>Save changes</Button>
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
								<Input id='current' type='password' />
							</div>
							<div className='space-y-1'>
								<Label htmlFor='new'>New password</Label>
								<Input id='new' type='password' />
							</div>
						</CardContent>
						<CardFooter>
							<Button>Save password</Button>
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
								<Input id='new' type='password' />
							</div>
						</CardContent>
						<CardFooter className='flex justify-end'>
							<Button variant='destructive'>Delete Account</Button>
						</CardFooter>
					</Card>
				</TabsContent>
			</Tabs>
		</div>
	);
}
export default ProfilePage;
