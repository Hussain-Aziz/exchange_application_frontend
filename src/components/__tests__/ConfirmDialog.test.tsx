import { describe, expect, it } from 'vitest'
import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import ConfirmDialog from '../ConfirmDialog';

describe('Confirm Dialog', () => {
  it('renders without crashing', () => {
    const { container } = render(<ConfirmDialog action='submit courses' open={true} setOpen={() => {}} />);
    expect(container).toBeTruthy();
    const button = screen.getAllByRole('button')[0]
    fireEvent.click(button);
  });
  it('renders without crashing', () => {
    const { container } = render(<ConfirmDialog action='submit courses' open={true} setOpen={() => {}} onConfirm={() => {}} />);
    expect(container).toBeTruthy();
    const button = screen.getAllByRole('button')[1]
    fireEvent.click(button);
  });
});