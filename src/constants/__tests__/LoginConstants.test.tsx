import {ElementWidth, LoginIconSize, LoginIconStyles, emailRegex, strongPasswordRegex} from '../LoginConstants';
import { describe, expect, it} from 'vitest'

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