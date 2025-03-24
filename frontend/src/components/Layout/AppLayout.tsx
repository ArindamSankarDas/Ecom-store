import { Outlet } from 'react-router-dom';

import Header from '@components/Header/Header';
import Footer from '../Footer/Footer';
import { useAuth } from '@context/AuthContext';
import { useEffect } from 'react';
import { logoutUser, refreshTokenUser } from '@api/apiService';

function Layout() {
	const { logout, login } = useAuth();

	useEffect(() => {
		(async function () {
			try {
				const data = await refreshTokenUser();
				login(data.accessToken);
			} catch (error) {
				if ((error as Error).message === '401') {
					await logoutUser();
					logout();
				}
			}
		})();
	}, []);

	return (
		<div id='layout' className='w-screen min-h-screen flex flex-col'>
			<Header />
			<Outlet />
			<Footer />
		</div>
	);
}
export default Layout;
