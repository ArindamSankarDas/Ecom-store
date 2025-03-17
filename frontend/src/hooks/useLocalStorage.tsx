import { useEffect, useState } from 'react';

function useLocalStorage(): {
	accessToken: string | null;
	setAuthToken: (token: string) => void;
} {
	const [accessToken, setAccessToken] = useState(
		localStorage.getItem('access-token')
	);

	function setAuthToken(token: string) {
		localStorage.setItem('access-token', token);

		setAccessToken(token);
	}

	useEffect(function () {
		const handleStorage = function (event: StorageEvent) {
			if (event.key === 'access-token') {
				setAccessToken(event.newValue);
			}
		};

		window.addEventListener('storage', handleStorage);

		return function () {
			window.removeEventListener('storage', handleStorage);
		};
	});

	return { accessToken, setAuthToken };
}

export default useLocalStorage;
