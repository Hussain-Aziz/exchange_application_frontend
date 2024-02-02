import { describe, expect, it } from 'vitest'
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import EmailField from '../EmailField';
import { act } from 'react-dom/test-utils';

describe('EmailField', () => {
  it('renders without crashing', () => {
    const { getByLabelText } = render(<EmailField emailRef={React.createRef()} />);

    expect(getByLabelText('Email')).toBeTruthy();
  });

  it('shows an error for invalid email', async () => {
    const { getAllByLabelText } = render(<EmailField emailRef={React.createRef()} checkEmailValidity />);
    const input = getAllByLabelText('Email')[0];

    await act(async () => {
      fireEvent.change(input, { target: { value: 'invalid email' } });
    });
  });
});