import { render, fireEvent, screen } from '@testing-library/react';
import { describe, expect, vi, it } from 'vitest'
import HomePageButton from '../HomePageButton'
import { UserProvider } from "../../contexts/UserContext";

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
        const { container } = render(<UserProvider><HomePageButton label="Test" onClick="test" numIndicators={2} /></UserProvider>);
        expect(container).toBeTruthy();
        const button = screen.getAllByRole('button')[0]
        fireEvent.click(button);
    });

    it('renders with a fucntion', () => {
        const { container } = render(<UserProvider><HomePageButton label="Test" onClick={() => {const x = "hi"}} /></UserProvider>);
        expect(container).toBeTruthy();
        const button = screen.getAllByRole('button')[0]
        fireEvent.click(button);
    });

});