import {ElementWidth, LoginIconSize, LoginIconStyles, emailRegex, strongPasswordRegex} from '../LoginConstants';
import { describe, expect, it, Mock, vi} from 'vitest'
import * as endpoints from '../endpoints';

describe('emailRegex', () => {
  it('should match aus.edu emails', () => {
    expect('test@aus.edu'.match(emailRegex)).toBeTruthy();
  });

  it('should not match non-aus.edu emails', () => {
    expect('test@gmail.com'.match(emailRegex)).toBeNull();
  });
});

describe('strongPasswordRegex', () => {
  it('should match strong passwords', () => {
    expect('Password123!'.match(strongPasswordRegex)).toBeTruthy();
  });

  it('should not match weak passwords', () => {
    expect('password'.match(strongPasswordRegex)).toBeNull();
  });
});

describe('LoginIconStyles', () => {
  it('should be valid', () => {
    let x1 = LoginIconStyles;
    let x2 = LoginIconSize;
    let x3 = ElementWidth;
  })
})


describe('endpoints', () => {
  it('should be valid', () => {
    let x = endpoints.loginEndpoint;
    x = endpoints.applicationInfoEndpoint;
    x = endpoints.startApplicationEndpoint;
    x = endpoints.listCoursesEndpoint;
    x = endpoints.availableApprovalsEnpoint;
    x = endpoints.availableSyllabusEndpoint;
    x = endpoints.UploadSyllabus;
    x = endpoints.ApproveCourse;
    x = endpoints.comparisonEndpoint;
    x = endpoints.facultListEndpoint;

  })
});

describe('getHeaders', () => {
  it('returns headers with token when token cookie is present', () => {
    const mockCookies = {
      get: vi.fn().mockReturnValue({ value: 'token' }),
    };

    const headers = endpoints.getHeaders(mockCookies as any);

    expect(headers).toEqual({
      "Authorization": "TOKEN token",
      "Content-Type": "application/json",
    });
  });

  it('redirects to login page when no token cookie is found', () => {
    const mockCookies = {
      get: vi.fn().mockReturnValue({ value: undefined }),
    };

    const headers = endpoints.getHeaders(mockCookies as any);

    expect(headers).toEqual({
      "Authorization": "TOKEN ",
      "Content-Type": "application/json",
    });
  });
});