import { AuthState } from '@lib/types';
import { logoutUser } from '@api/apiService';
import {
	createContext,
	useContext,
	useEffect,
	useState,
	ReactNode,
} from 'react';

type Props = {
	children: ReactNode;
};

const AuthContext = createContext<AuthState | undefined>(undefined);

export function AuthProvider({ children }: Props) {
	const [accessToken, setAccessToken] = useState<string | null>(() => {
		return localStorage.getItem('access-token') || null;
	});

	const isAuthenticated = !!accessToken;

	useEffect(() => {
		const handleStorage = (event: StorageEvent) => {
			if (event.key === 'access-token') {
				setAccessToken(event.newValue || null);
			}
		};

		window.addEventListener('storage', handleStorage);
		return () => window.removeEventListener('storage', handleStorage);
	}, []);

	const login = (token: string) => {
		if (!token) return;
		localStorage.setItem('access-token', token);
		setAccessToken(token);
	};

	const logout = () => {
		logoutUser().then(() => {
			localStorage.removeItem('access-token');
			setAccessToken(null);
		});
	};

	const value = {
		accessToken,
		isAuthenticated,
		login,
		logout,
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthState {
	const context = useContext(AuthContext);

	if (!context) {
		throw new Error('useAuth must be used within an AuthProvider');
	}
	return context;
}
