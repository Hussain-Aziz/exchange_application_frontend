import { describe, expect, test } from 'vitest'
import { useTheme } from '@mui/material/styles';
import CustomThemeProvider, {theme} from '../CustomThemeProvider';
import { renderHook } from '@testing-library/react';

describe('CustomThemeProvider', () => {
  test('provides the correct theme', () => {
    const { result } = renderHook(() => useTheme(), {
      wrapper: CustomThemeProvider,
    });

    expect(result.current).toEqual(theme);
  });

  test('provides the correct style overrides for MuiButton', () => {
    const { result } = renderHook(() => useTheme(), {
      wrapper: CustomThemeProvider,
    });

    expect(result.current.components?.MuiButton?.styleOverrides).toEqual({
      root: {
        backgroundColor: '#354545',
      },
    });
  });
});