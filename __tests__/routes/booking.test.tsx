import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import useApi from '@/hooks/useApi';
import axios from 'axios';
import '@testing-library/jest-dom';
import BookingPage from '@/routes/booking';

vi.mock('@/hooks/useApi');

const mockBookingResponse = {
  id: 'booking-id',
  time: '2024-04-10T10:00',
  location: 'Test location',
  notes: 'Just a test',
  booking_type: 'consultation'
};

describe('BookingPage', () => {
  let postMock: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    postMock = vi.fn().mockResolvedValue({ data: mockBookingResponse });

    const realAxiosInstance = axios.create();
    realAxiosInstance.post = postMock;

    vi.mocked(useApi).mockReturnValue(realAxiosInstance);
  });

  afterEach(() => {
    vi.resetModules();
    vi.resetAllMocks();
  });

  it('renders all required form elements', () => {
    render(<BookingPage />);

    expect(screen.getByLabelText(/time/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/location/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/notes/i)).toBeInTheDocument();
    expect(screen.getByRole('combobox', { name: 'consultation' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Confirm/i })).toBeDisabled();
  });

  it('validates empty required fields', async () => {
    render(<BookingPage />);

    await userEvent.click(screen.getByRole('button', { name: /Confirm/i }));

    await waitFor(() => {
      expect(screen.getAllByRole('img')[0]).toBeInTheDocument();
    });
  });

  it('submits valid form and calls API', async () => {
    render(<BookingPage />);

    await userEvent.type(screen.getByLabelText(/time/i), '2024-04-10T10:00');
    await userEvent.type(screen.getByLabelText(/location/i), 'Test location');
    await userEvent.type(screen.getByLabelText(/notes/i), 'Just a test');

    await userEvent.click(screen.getByRole('combobox', { name: 'consultation' }));
    const installationOption = screen.getAllByText('installation')
    await userEvent.click(installationOption[1]);

    const submitBtn = screen.getByRole('button', { name: /Confirm/i });
    await waitFor(() => expect(submitBtn).toBeEnabled());
    await userEvent.click(submitBtn);

    await waitFor(() => {
      expect(postMock).toHaveBeenCalledWith('/booking', expect.anything(), expect.anything());
    });
  });

  it('handles API errors gracefully', async () => {
    postMock.mockRejectedValueOnce({
      isAxiosError: true,
      response: {
        status: 400,
        data: 'Invalid request'
      }
    });

    render(<BookingPage />);

    await userEvent.type(screen.getByLabelText(/time/i), '2024-04-10T10:00');
    await userEvent.type(screen.getByLabelText(/location/i), 'Bad location');

    const submitBtn = screen.getByRole('button', { name: /Confirm/i });
    await waitFor(() => expect(submitBtn).toBeEnabled());
    await userEvent.click(submitBtn);

    await waitFor(() => {
      expect(postMock).toHaveBeenCalled();
      // if you handle error feedback visually, you can assert it here
    });
  });
});
