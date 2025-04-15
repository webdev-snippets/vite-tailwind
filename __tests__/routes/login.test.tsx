import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import LoginPage from '@/routes/login';
import useApi from '@/hooks/useApi';
import { Token } from '@/types/backend';
import axios from 'axios';
import { useToken } from '@/context/authContext';

vi.mock('@/hooks/useApi')
vi.mock('@/context/authContext')

const responseToken: Token = {
  access_token: 'abc123',
  token_type: 'Bearer'
}

const mockTokenContext = {
  token: null,
  setToken: vi.fn(),
  clearToken: vi.fn()
}

describe('LoginPage', () => {
  let postMock: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    postMock = vi.fn().mockResolvedValue({ data: responseToken });

    const realAxiosInstance = axios.create();
    realAxiosInstance.post = postMock;

    vi.mocked(useApi).mockReturnValue(realAxiosInstance);
    vi.mocked(useToken).mockReturnValue(mockTokenContext);
  });
  afterEach(() => {
    vi.resetModules();
    vi.resetAllMocks()
  });
  
  it('submits login form with correct values and calls setToken', async () => {
    render(<LoginPage />);
    
    const {setToken} = useToken()
    await userEvent.type(screen.getByLabelText(/username/i), 'testuser');
    await userEvent.type(screen.getByLabelText(/password/i), 'securePass123');

    await userEvent.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => {
      expect(postMock).toHaveBeenCalledWith(
        '/auth/token',
        expect.objectContaining({
          username: 'testuser',
          password: 'securePass123',
          grant_type: 'password',
          scope: expect.any(String),
        }),
        expect.objectContaining({
          headers: expect.objectContaining({ 'Content-Type': 'application/x-www-form-urlencoded' })
        })
      );

      expect(setToken).toHaveBeenCalledWith({
        access_token: 'abc123',
        token_type: 'Bearer',
      });
    });
  });

  it('shows validation error for short password', async () => {
    render(<LoginPage />);

    await userEvent.type(screen.getByLabelText(/username/i), 'user');
    await userEvent.type(screen.getByLabelText(/password/i), 'short');
    await userEvent.click(screen.getByRole('button', { name: /login/i }));

    expect(await screen.findByText(/string must contain at least 8 character/i)).toBeInTheDocument();
    expect(postMock).not.toHaveBeenCalled();
  });

  it('shows required validation errors for empty fields', async () => {
    render(<LoginPage />);

    await userEvent.click(screen.getByRole('button', { name: /login/i }));

    expect(await screen.findAllByText('String must contain at least 1 character(s)')).toHaveLength(2);
    expect(postMock).not.toHaveBeenCalled();
  });

  it('handles API error gracefully', async () => {
    postMock.mockRejectedValueOnce((new Error('Network error')));

    render(<LoginPage />);
    await userEvent.type(screen.getByLabelText(/username/i), 'testuser');
    await userEvent.type(screen.getByLabelText(/password/i), 'securePass123');
    await userEvent.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => {
      expect(postMock).toHaveBeenCalled();
    });
  });
});