import { render, screen, waitFor } from '@testing-library/react';
import ProductPage from '@/routes/products'; // adjust the path if needed
import { vi } from 'vitest';
import { Product } from '@/types/backend';
import axios from 'axios';
import useApi from '@/hooks/useApi';

vi.mock('@/hooks/useApi');

const MockProduct: Product[] = [{
    id: '1',
    title: 'Test Product',
    description: 'A product for testing',
    price: 42,
    tags: ['tag1', 'tag2'],
    image_uri: 'https://example.com/image.jpg',
}]


describe('ProductPage', () => {
    let getMock: ReturnType<typeof vi.fn>;

    beforeEach(() => {
        getMock = vi.fn().mockResolvedValue({ data: MockProduct });

        // Use actual Axios instance and override only the get method
        const realAxiosInstance = axios.create();
        realAxiosInstance.get = getMock;

        vi.mocked(useApi).mockReturnValue(realAxiosInstance);
    });
    afterEach(() => {
        vi.resetModules();
        vi.resetAllMocks()
    });

    it('renders fetched product data', async () => {
        render(<ProductPage />);

        await waitFor(() => {
            expect(screen.getByText('Test Product')).toBeInTheDocument();
            expect(screen.getByText('A product for testing')).toBeInTheDocument();
            expect(screen.getByText(/42/)).toBeInTheDocument(); // price
            expect(screen.getByText('tag1')).toBeInTheDocument();
            expect(screen.getByText('tag2')).toBeInTheDocument();
        });
    });

    it('shows fallback data on initial load', async () => {
        // overwrite mock to delay resolving the fetch
        const useApi = (await import('@/hooks/useApi')).default;
        vi.spyOn(useApi(), 'get').mockImplementationOnce(() => new Promise(() => { })); // hangs forever

        render(<ProductPage />);

        expect(screen.getAllByText('Unknown')).toHaveLength(3)
        expect(screen.getByText('See more')).toBeInTheDocument()
        expect(screen.getByText(/99/)).toBeInTheDocument(); // fallback price
    });
});
