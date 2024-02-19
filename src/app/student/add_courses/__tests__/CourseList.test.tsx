import { render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest'
import { getAUSCoursesList } from '../CoursesList';
import { e } from 'vitest/dist/reporters-1evA5lom.js';

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

describe('get course list', () => {
  it('runs without crashing', () => {
    const list = getAUSCoursesList();
    expect(list).not.toBeFalsy();
  });
});