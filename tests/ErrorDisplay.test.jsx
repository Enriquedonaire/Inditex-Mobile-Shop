import { render, screen } from '@testing-library/react';
import ErrorDisplay from '../src/components/ErrorDisplay';

describe('ErrorDisplay', () => {
  it('renderiza el mensaje de error', () => {
    render(<ErrorDisplay message="Test error" />);
    expect(screen.getByText('Test error')).toBeInTheDocument();
    expect(screen.getAllByText(/error/i).length).toBeGreaterThan(0);
  });
});