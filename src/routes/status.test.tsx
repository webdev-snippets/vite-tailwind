import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import StatusPage from './status'; // adjust as needed
import useApi from '@/hooks/useApi';
import { Health } from '@/types/backend';
import axios from 'axios';

vi.mock('@/hooks/useApi');

const initialMockHealth: Health = {
  status: 'Healthy',
  debug_level: 'Debug',
  issuer: 'MyApp',
  db_url: 'postgres://localhost:5432',
  expire_time: 3600,
};

describe('StatusPage', () => {
  let getMock: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    getMock = vi.fn().mockResolvedValue({ data: initialMockHealth });

    // Use actual Axios instance and override only the get method
    const realAxiosInstance = axios.create();
    realAxiosInstance.get = getMock;

    vi.mocked(useApi).mockReturnValue(realAxiosInstance);
  });

  it('fetches and displays initial health status from the API', async () => {
    render(<StatusPage />);

    await waitFor(() => {
      expect(getMock).toHaveBeenCalledWith('/health');
    });

    for (const [key, value] of Object.entries(initialMockHealth)) {
      expect(screen.getByText(new RegExp(`${key}: ${value}`))).toBeInTheDocument();
    }
  });

  it('refreshes data when refresh button is clicked', async () => {
    render(<StatusPage />);

    await waitFor(() => {
      expect(getMock).toHaveBeenCalledTimes(1);
    });

    const updatedMockHealth: Health = {
      status: 'Degraded',
      debug_level: 'Info',
      issuer: 'OtherIssuer',
      db_url: 'sqlite://dev',
      expire_time: 999,
    };

    getMock.mockResolvedValueOnce({ data: updatedMockHealth });

    const refreshButton = screen.getByRole('button', { name: /refresh/i });
    await userEvent.click(refreshButton);

    await waitFor(() => {
      expect(screen.getByText(/status: Degraded/i)).toBeInTheDocument();
      expect(screen.getByText(/issuer: OtherIssuer/i)).toBeInTheDocument();
    });

    expect(getMock).toHaveBeenCalledTimes(2);
  });
});