import useLocalStorage from '@/hooks/useLocalStorage';
import { AuthState } from '@lib/types';
import React, { createContext, useContext } from 'react';

type AuthContextType = AuthState & {
	isAuthenticated: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
	const { accessToken, login, logout } = useLocalStorage();

	const isAuthenticated = !!accessToken;

	return (
		<AuthContext.Provider
			value={{ accessToken, login, logout, isAuthenticated }}
		>
			{children}
		</AuthContext.Provider>
	);
}

export function useAuth() {
	const context = useContext(AuthContext);

	if (!context) {
		throw new Error('useAuth must be used within an AuthProvider');
	}

	return context;
}
