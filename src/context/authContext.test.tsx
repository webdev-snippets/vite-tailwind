import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TokenProvider, useToken } from './authContext'; // Adjust the import path as necessary
import { Token } from '@/types/backend'; // Adjust the import path as necessary

// Mock component to use the Token context
const MockComponent = () => {
    const { token, setToken, clearToken } = useToken();

    return (
        <div>
            <div data-testid="access_token">{token ? token.access_token : 'No token'}</div>
            <button type='button' onClick={() => setToken({ access_token: 'newToken', token_type: 'testing' } as Token)}>Set Token</button>
            <button type='button' onClick={clearToken}>Clear Token</button>
        </div>
    );
};

describe('TokenContext', () => {
    test('should provide initial token value as null', () => {
        render(
            <TokenProvider>
                <MockComponent />
            </TokenProvider>
        );

        expect(screen.getByTestId('access_token')).toHaveTextContent('No token');
    });

    test('should set a new token value', async () => {
        render(
            <TokenProvider>
                <MockComponent />
            </TokenProvider>
        );

        await userEvent.click(screen.getByText('Set Token'));

        expect(screen.getByTestId('access_token')).toHaveTextContent('newToken');
    });

    test('should clear the token value', async () => {
        render(
            <TokenProvider>
                <MockComponent />
            </TokenProvider>
        );

        await userEvent.click(screen.getByText('Set Token'));
        expect(screen.getByTestId('access_token')).toHaveTextContent('newToken');

        await userEvent.click(screen.getByText('Clear Token'));
        expect(screen.getByTestId('access_token')).toHaveTextContent('No token');
    });
});