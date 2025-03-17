import { AuthState } from '@lib/types';
import { useEffect, useState } from 'react';

function useLocalStorage(): AuthState {
	const [accessToken, setAccessToken] = useState(function () {
		return localStorage.getItem('access-token') || null;
	});

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

	function login(token: string) {
		localStorage.setItem('access-token', token);

		setAccessToken(token);
	}

	function logout() {
		localStorage.removeItem('access-token');

		setAccessToken(null);
	}

	return { accessToken, login, logout };
}

export default useLocalStorage;
