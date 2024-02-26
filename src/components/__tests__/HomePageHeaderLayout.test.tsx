import { render, fireEvent, screen } from '@testing-library/react';
import { describe, expect, vi, it } from 'vitest'
import HomePageHeaderLayout from '../HomePageHeaderLayout';

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
    it('renders', () => {
        const { container } = render(<HomePageHeaderLayout portalHeader="Test"><div>Test</div></HomePageHeaderLayout>);
        expect(container).toBeTruthy();
    });
});