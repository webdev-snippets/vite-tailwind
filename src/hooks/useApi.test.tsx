import { renderHook } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import axios from 'axios';
import useAxios from './useApi'; // Adjust to your actual path

// Import Token type and mock the context
import { Token } from '@/types/backend';
import * as AuthContext from '@/context/authContext';

vi.mock('@/context/authContext');

// Make sure axios.create is spy-able (optional)
vi.spyOn(axios, 'create');

describe('useAxios hook', () => {
  const mockedUseToken = vi.mocked(AuthContext.useToken);

  it('returns axios instance with Authorization header when token is present', () => {
    const mockToken: Token = {
      access_token: '123abc',
      token_type: 'Bearer',
    };

    mockedUseToken.mockReturnValue({
      token: mockToken,
      setToken: vi.fn(),
      clearToken: vi.fn(),
    });

    const { result } = renderHook(() => useAxios());
    const instance = result.current;

    expect(instance.defaults.baseURL).toBe('http://127.0.0.1:8000');
    expect(instance.defaults.headers.common['Authorization']).toBe('Bearer 123abc');
  });

  it('returns axios instance without Authorization header when token is null', () => {
    mockedUseToken.mockReturnValue({
      token: null,
      setToken: vi.fn(),
      clearToken: vi.fn(),
    });

    const { result } = renderHook(() => useAxios());
    const instance = result.current;

    expect(instance.defaults.baseURL).toBe('http://127.0.0.1:8000');
    expect(instance.defaults.headers.common['Authorization']).toBeUndefined();
  });
});
