import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest'
import Layout from '../layout';

describe('Layout', () => {
  it('renders without crashing', () => {
    const { container } = render(<Layout><></></Layout>);
    expect(container).toBeTruthy();
  });
});