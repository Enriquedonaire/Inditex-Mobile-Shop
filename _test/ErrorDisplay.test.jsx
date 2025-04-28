import { render, screen } from '@testing-library/react';
import ErrorDisplay from '../src/components/ErrorDisplay';

describe('ErrorDisplay', () => {
  it('renders error message', () => {
    render(<ErrorDisplay message="Test error" />);
    expect(screen.getByText('Test error')).toBeInTheDocument();
    expect(screen.getByText(/error/i)).toBeInTheDocument();
  });
});