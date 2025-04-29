import React from 'react';
import { render } from '@testing-library/react';
import ErrorDisplay from '../src/components/ErrorDisplay';

describe('ErrorDisplay', () => {
  it('renderiza sin errores', () => {
    render(<ErrorDisplay message="Test error" />);
  });
});