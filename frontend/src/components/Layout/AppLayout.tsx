import { Outlet } from 'react-router-dom';

import Header from '@components/Header/Header';
import Footer from '../Footer/Footer';

function Layout() {
	return (
		<div id='layout' className='w-screen min-h-screen flex flex-col'>
			<Header />
			<Outlet />
			<Footer />
		</div>
	);
}
export default Layout;
