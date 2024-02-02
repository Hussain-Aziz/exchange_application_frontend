import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest'
import Home from '../page';

describe('App', () => {
  it('renders without crashing', () => {
    const { container } = render(<Home />);
    expect(container).toBeTruthy();
  });
});