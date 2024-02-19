import { render } from '@testing-library/react';
import { describe, expect, vi, it } from 'vitest'
import HomePageButton from '../HomePageButton'

vi.mock('next/navigation', () => ({
    useRouter: () => ({
        route: '/',
        pathname: '',
        query: '',
        asPath: '',
        push: vi.fn(),
    }),
    useSearchParams: () => ({
        get: vi.fn(),
    }),
}));

describe('Home Page Button', () => {
    it('renders with a link', () => {
        const { container } = render(<HomePageButton label="Test" onClick="test" />);
        expect(container).toBeTruthy();
    });

    it('renders with a fucntion', () => {
        const { container } = render(<HomePageButton label="Test" onClick={() => {const x = "hi"}} />);
        expect(container).toBeTruthy();
    });

    it('renders with a logout', () => {
        const { container } = render(<HomePageButton label="Test" logout />);
        expect(container).toBeTruthy();
    });
});