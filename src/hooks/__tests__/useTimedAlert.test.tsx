import { renderHook, act } from '@testing-library/react';
import { vitest, describe, it, expect, } from 'vitest';
import useTimedAlert from '../useTimedAlert';
vitest.useFakeTimers();

describe('useTimedAlert', () => {
  it('sets and clears the alert info after a delay', () => {
    const { result } = renderHook(() => useTimedAlert(50));

    act(() => {
      result.current[1]({ severity: 'error', message: 'Test error' });
    });

    expect(result.current[0]).toEqual({ severity: 'error', message: 'Test error' });

    act(() => {
      vitest.advanceTimersByTime(50);
    });

    expect(result.current[0]).toBeUndefined();
  });
});