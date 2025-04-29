import React from 'react';
import { render } from '@testing-library/react';
import ThemeToggle from '../src/components/ThemeToggle';

describe('ThemeToggle', () => {
  it('renderiza sin errores', () => {
    render(<ThemeToggle />);
  });
});