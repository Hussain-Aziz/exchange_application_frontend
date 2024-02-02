import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest'
import LoginLayout from '../template';

describe('LoginLayout', () => {
  test('renders LoginLayout component successfully', () => {
    render(<LoginLayout><></></LoginLayout>);

    expect(screen.getByText('AUS EXCHANGE PROGRAM PORTAL')).toBeTruthy();

    const logoImage = screen.getByAltText('logo');
    expect(logoImage).toBeTruthy();

    const typographyComponent = screen.getByText('AUS EXCHANGE PROGRAM PORTAL');
    expect(typographyComponent).toBeTruthy();
  });
});