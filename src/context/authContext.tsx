/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useMemo, useState, ReactNode, use } from 'react';

import { Token } from '@/types/backend';

interface TokenContextType {
    token: Token | null;
    setToken: (token: Token) => void;
    clearToken: () => void;
}

const TokenContext = createContext<TokenContextType | undefined>(undefined);

export const useToken = () => {
    const context = use(TokenContext);
    if (!context) {
        throw new Error('useToken must be used within a TokenProvider');
    }
    return context;
};

interface TokenProviderProps {
    children: ReactNode;
}

export const TokenProvider: React.FC<TokenProviderProps> = ({ children }) => {
    const [token, setTokenState] = useState<Token | null>(null);

    const setToken = (newToken: Token) => {
        setTokenState(newToken);
    };

    const clearToken = () => {
        setTokenState(null);
    };

    const value = useMemo(() => ({ token, setToken, clearToken }), [token]);

    return (
        <TokenContext value={value}>
            {children}
        </TokenContext>
    );
};