import { jest } from '@jest/globals';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ProductListPage from '../src/pages/ProductListPage';

// Corrección: Simular correctamente las respuestas de la API
jest.mock('../src/services/api', () => ({
  fetchProducts: jest.fn().mockResolvedValue([
    { id: '1', brand: 'Apple', model: 'iPhone 12', price: 999 },
    { id: '2', brand: 'Samsung', model: 'Galaxy S21', price: 899 }
  ])
}));

jest.mock('../src/context/CartContext', () => {
  return {
    CartProvider: ({ children }) => <>{children}</>,
    useCart: () => ({
      cartItems: [],
      addToCart: jest.fn(),
      isCartOpen: false,
      toggleCart: jest.fn()
    })
  };
});

jest.mock('../src/context/ThemeContext', () => {
  return {
    ThemeProvider: ({ children }) => <>{children}</>,
    useTheme: () => ({ theme: 'light', toggleTheme: jest.fn() })
  };
});

describe('ProductListPage', () => {
  test('should render product list', async () => {
    render(
      <BrowserRouter>
        <ProductListPage />
      </BrowserRouter>
    );
    
    await waitFor(() => {
      expect(screen.getByText('Apple')).toBeInTheDocument();
      expect(screen.getByText('iPhone 12')).toBeInTheDocument();
      expect(screen.getByText('Samsung')).toBeInTheDocument();
      expect(screen.getByText('Galaxy S21')).toBeInTheDocument();
    });
  });
  
  test('should filter products by brand', async () => {
    render(
      <BrowserRouter>
        <ProductListPage />
      </BrowserRouter>
    );
    
    const searchInput = screen.getByPlaceholderText(/search/i);
    fireEvent.change(searchInput, { target: { value: 'apple' } });
    
    await waitFor(() => {
      expect(screen.getByText('Apple')).toBeInTheDocument();
      expect(screen.queryByText('Samsung')).not.toBeInTheDocument();
    });
  });
});