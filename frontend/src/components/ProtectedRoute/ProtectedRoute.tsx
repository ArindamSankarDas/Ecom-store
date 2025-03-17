import useLocalStorage from '@/hooks/useLocalStorage';
import { Navigate, Outlet } from 'react-router-dom';

function ProtectedRoute() {
	const { isAuthenticated } = useLocalStorage();

	return !isAuthenticated ? <Navigate to={'/login'} /> : <Outlet />;
}

export default ProtectedRoute;
