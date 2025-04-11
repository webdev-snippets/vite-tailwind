import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import RegisterPage from './register'; 
import useApi from '@/hooks/useApi';
import { User } from '@/types/backend';
import axios from 'axios';

vi.mock('@/hooks/useApi');

const mockUserResponse: User = {
  id: '123',
  username: 'newuser',
  email: 'newuser@example.com',
};

describe('RegisterPage', () => {
  let postMock: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    postMock = vi.fn().mockResolvedValue({ data: mockUserResponse});

    const realAxiosInstance = axios.create();
    realAxiosInstance.post = postMock;

    vi.mocked(useApi).mockReturnValue(realAxiosInstance);
  });
  afterEach(() => {
    vi.resetModules();
    vi.resetAllMocks()
  });

  it('submits registration form and displays returned user', async () => {
    render(<RegisterPage />);

    await userEvent.type(screen.getByLabelText(/username/i), 'newuser');
    await userEvent.type(screen.getByLabelText(/email/i), 'newuser@example.com');
    await userEvent.type(screen.getByLabelText(/password/i), 'verysecure123');

    await userEvent.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => {
      expect(postMock).toHaveBeenCalledWith(
        '/user',
        {
          username: 'newuser',
          email: 'newuser@example.com',
          password: 'verysecure123'
        },
        expect.objectContaining({
          headers: {
            'Content-Type': 'application/json'
          }
        })
      );

      expect(screen.getByText(/new user: newuser/i)).toBeInTheDocument();
    });
  });

  it('shows validation errors for invalid input', async () => {
    render(<RegisterPage />);

    await userEvent.type(screen.getByLabelText(/email/i), 'notanemail');
    await userEvent.type(screen.getByLabelText(/password/i), '123');

    await userEvent.click(screen.getByRole('button', { name: /login/i }));

    expect(await screen.findByText(/invalid email/i)).toBeInTheDocument();
    expect(await screen.findByText(/at least 8 character/i)).toBeInTheDocument();
    expect(await screen.findByText(/must contain at least 1 character/i)).toBeInTheDocument();

    expect(postMock).not.toHaveBeenCalled();
  });

  it('shows required field errors when all fields are empty', async () => {
    render(<RegisterPage />);

    await userEvent.click(screen.getByRole('button', { name: /login/i }));

    expect(await screen.findAllByText(/must contain at least 1 character/i)).toHaveLength(2);
    expect(await screen.findByText(/invalid email/i)).toBeInTheDocument();

    expect(postMock).not.toHaveBeenCalled();
  });

  it('alerts user when API returns 400 error', async () => {
    postMock.mockRejectedValueOnce({
      isAxiosError: true,
      response: { status: 400, data: 'Bad Request' },
      message: 'Bad Request'
    });

    const alertMock = vi.spyOn(window, 'alert').mockImplementation(() => {});

    render(<RegisterPage />);

    await userEvent.type(screen.getByLabelText(/username/i), 'baduser');
    await userEvent.type(screen.getByLabelText(/email/i), 'baduser@example.com');
    await userEvent.type(screen.getByLabelText(/password/i), 'badpassword');

    await userEvent.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => {
      expect(postMock).toHaveBeenCalled();
      expect(alertMock).toHaveBeenCalledWith('Invalid request data. Please check your input.');
    });

    alertMock.mockRestore();
  });
});
