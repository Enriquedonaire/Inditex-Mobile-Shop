import { render, screen, fireEvent } from '@testing-library/react';
import ThemeToggle from '../src/components/ThemeToggle';

jest.mock('../src/context/ThemeContext', () => ({
  useTheme: () => ({ theme: 'light', toggleTheme: jest.fn() })
}));

describe('ThemeToggle', () => {
  it('renderiza y permite alternar el tema', () => {
    render(<ThemeToggle />);
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    fireEvent.click(button);
  });
});