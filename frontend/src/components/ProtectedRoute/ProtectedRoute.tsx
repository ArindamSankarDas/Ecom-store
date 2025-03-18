import { useAuth } from '@context/AuthContext';

import { Navigate, Outlet } from 'react-router-dom';

function ProtectedRoute() {
	const { isAuthenticated } = useAuth();

	return !isAuthenticated ? <Navigate to={'/login'} /> : <Outlet />;
}

export default ProtectedRoute;
