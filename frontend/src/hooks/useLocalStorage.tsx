import { logoutUser } from '@api/apiService';
import { AuthState } from '@lib/types';
import { useEffect, useState } from 'react';

function useLocalStorage(): AuthState {
	const [accessToken, setAccessToken] = useState(function () {
		return localStorage.getItem('access-token') || null;
	});

	const [isAuthenticated, setIsAuthenticated] = useState(!!accessToken);

	useEffect(function () {
		const handleStorage = function (event: StorageEvent) {
			if (event.key === 'access-token') {
				setAccessToken(event.newValue || null);
			}
		};

		window.addEventListener('storage', handleStorage);

		return function () {
			window.removeEventListener('storage', handleStorage);
		};
	});

	useEffect(
		function () {
			setIsAuthenticated(!!accessToken);
		},
		[accessToken]
	);

	function login(token: string) {
		if (!token) return;
		localStorage.setItem('access-token', token);

		setAccessToken(token);
	}

	function logout() {
		logoutUser().then(function () {
			localStorage.removeItem('access-token');

			setAccessToken(null);
		});
	}

	return { accessToken, login, logout, isAuthenticated };
}

export default useLocalStorage;
