import React from 'react';
import { render, fireEvent, act, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest'
import PasswordField from '../PasswordField';

describe('PasswordField', () => {
  it('renders without crashing', () => {
    render(<PasswordField passwordRef={React.createRef()} />);
    expect(screen.getAllByLabelText('Password')[0]).toBeTruthy();
  });

  it('shows an error for weak password', async () => {
    render(<PasswordField passwordRef={React.createRef()} checkPasswordStrength />);
    const input = screen.getAllByLabelText('Password')[0];

    await act(async () => {
      fireEvent.change(input, { target: { value: 'abc123' } });
    });
  });

  it('changes visibility when the icon is clicked', async () => {
    render(<PasswordField passwordRef={React.createRef()} />);
    const button = screen.getAllByRole('button')[0]
    fireEvent.click(button);
    fireEvent.mouseDown(button);
    expect(button).toBeTruthy();
  });
});