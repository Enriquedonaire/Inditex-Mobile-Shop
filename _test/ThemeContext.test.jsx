import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider, useTheme } from '../src/context/ThemeContext';


const TestComponent = () => {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <div>
      <span data-testid="current-theme">{theme}</span>
      <button data-testid="toggle-theme" onClick={toggleTheme}>
        Toggle Theme
      </button>
    </div>
  );
};

describe('ThemeContext', () => {
  beforeEach(() => {
    // Revertir el ajuste en los valores iniciales de localStorage
    jest.spyOn(localStorage, 'getItem').mockImplementation((key) => {
      if (key === 'theme') return 'dark';
      return null;
    });
    jest.spyOn(localStorage, 'setItem').mockImplementation(() => {});
    
    localStorage.clear();
    
    
    document.documentElement.classList.remove('dark');
  });
  
  test('should initialize with light theme by default', () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );
    
    expect(screen.getByTestId('current-theme')).toHaveTextContent('light');
    expect(document.documentElement.classList.contains('dark')).toBe(false);
  });
  
  test('should initialize with dark theme if saved in localStorage', () => {
    
    localStorage.getItem.mockReturnValueOnce('dark');
    
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );
    
    expect(screen.getByTestId('current-theme')).toHaveTextContent('dark');
    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });
  
  test('should toggle theme when button is clicked', async () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );
    
    
    expect(screen.getByTestId('current-theme')).toHaveTextContent('light');
    
    
    await act(async () => {
      userEvent.click(screen.getByTestId('toggle-theme'));
    });
    
    
    expect(screen.getByTestId('current-theme')).toHaveTextContent('dark');
    expect(document.documentElement.classList.contains('dark')).toBe(true);
    
    
    await act(async () => {
      userEvent.click(screen.getByTestId('toggle-theme'));
    });
    
    
    expect(screen.getByTestId('current-theme')).toHaveTextContent('light');
    expect(document.documentElement.classList.contains('dark')).toBe(false);
  });
  
  test('should persist theme in localStorage', async () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );
    
    
    await act(async () => {
      userEvent.click(screen.getByTestId('toggle-theme'));
    });
    
    expect(localStorage.setItem).toHaveBeenCalledWith('theme', 'dark');
    
    
    await act(async () => {
      userEvent.click(screen.getByTestId('toggle-theme'));
    });
    
    expect(localStorage.setItem).toHaveBeenCalledWith('theme', 'light');
  });
});