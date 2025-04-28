import { jest } from '@jest/globals';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Header from '../src/components/Header';
import { CartProvider } from '../src/context/CartContext';
import { ThemeProvider } from '../src/context/ThemeContext';


jest.mock('../src/components/Cart', () => {
  return function MockCart() {
    return <div data-testid="cart-component">Cart Component</div>;
  };
});

jest.mock('../src/components/ThemeToggle', () => {
  return function MockThemeToggle() {
    return <button data-testid="theme-toggle">Toggle Theme</button>;
  };
});


const mockToggleCart = jest.fn();
jest.mock('../src/context/CartContext', () => ({
  ...jest.requireActual('../src/context/CartContext'),
  useCart: () => ({
    cartCount: 2,
    toggleCart: mockToggleCart,
    isCartOpen: false
  })
}));

describe('Header Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should render header with logo', () => {
    render(
      <ThemeProvider>
        <CartProvider>
          <BrowserRouter>
            <Header />
          </BrowserRouter>
        </CartProvider>
      </ThemeProvider>
    );
    
    expect(screen.getByText(/mobile shop/i)).toBeInTheDocument();
    expect(screen.getByTestId('theme-toggle')).toBeInTheDocument();
  });

  test('should toggle cart when cart button is clicked', () => {
    render(
      <ThemeProvider>
        <CartProvider>
          <BrowserRouter>
            <Header />
          </BrowserRouter>
        </CartProvider>
      </ThemeProvider>
    );
    
    
    const cartButton = screen.getByRole('button', { name: /carrito de compras/i });
    fireEvent.click(cartButton);
    
    expect(mockToggleCart).toHaveBeenCalled();
  });

  test('should display cart count badge when cartCount > 0', () => {
    render(
      <ThemeProvider>
        <CartProvider>
          <BrowserRouter>
            <Header />
          </BrowserRouter>
        </CartProvider>
      </ThemeProvider>
    );
    
    
    const badge = screen.getByText('2');
    expect(badge).toBeInTheDocument();
  });
});