import { Routes, Route, Navigate } from 'react-router-dom';

import AppLayout from '@components/Layout/AppLayout';
import ProductsLayout from '@components/Layout/ProductsLayout';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';

import HomePage from '@pages/HomePage';
import ContactPage from '@pages/ContactPage';
import CartPage from '@pages/CartPage';
import LoginPage from '@pages/LoginPage';
import ShopPage from '@pages/ShopPage';
import ProductItemPage from '@pages/ProductItemPage';
import SignUpPage from '@pages/SignUpPage';
import ProfilePage from '@pages/ProfilePage';

import { useFetchCategoryList } from '@hooks/useProducts';
import { AuthProvider } from './context/AuthContext';

const App = () => {
	const categoryList = useFetchCategoryList();

	return (
		<AuthProvider>
			<Routes>
				{/* Main layout for WebApp altogether */}
				<Route path='/' element={<AppLayout />}>
					{/* Routes to the main page on load, i.e. HomePage(/) */}
					<Route index element={<HomePage />} />
					{/* Routes to the Products(/shop) route which has another layout on top of AppLayout  */}
					<Route
						path='shop'
						element={<ProductsLayout categoryList={categoryList} />}
					>
						{/* Reroutes it to /shop/all using Navigate to replace the history stack  */}
						<Route index element={<Navigate to='all' replace />} />
						{/* Dynamic routing of the product category(/shop/category) which is received from the categoryList */}
						{categoryList.map((routeElem, index) => (
							<Route
								key={index}
								path={routeElem}
								element={<ShopPage currentPath={routeElem} />}
							>
								{/* Route for single product(/shop/category/:id) items using product id  */}
								<Route index path=':id' element={<ProductItemPage />} />
							</Route>
						))}
					</Route>

					{/* Routes to the contact when clicked on, i.e. ContactPage(/contact) */}
					<Route path='contact' element={<ContactPage />} />
					{/* Routes to the cart when clicked on, i.e. CartPage(/cart) */}
					<Route path='cart' element={<CartPage />} />
					{/* Routes to the login when clicked on, i.e. LoginPage(/login) */}
					<Route path='login' element={<LoginPage />} />
					{/* Routes to the signup when clicked on, i.e. SignUpPage(/signup) */}
					<Route path='signup' element={<SignUpPage />} />

					{/* Route Protection */}
					<Route element={<ProtectedRoute />}>
						<Route path='/profile' element={<ProfilePage />} />
					</Route>
				</Route>
			</Routes>
		</AuthProvider>
	);
};
export default App;
