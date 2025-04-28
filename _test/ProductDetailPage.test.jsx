import { jest } from '@jest/globals';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProductDetailPage from '../src/pages/ProductDetailPage';
import { CartProvider } from '../src/context/CartContext';
import { ThemeProvider } from '../src/context/ThemeContext';
// Corrección: Asegurar que las importaciones de módulos ES sean compatibles
import * as api from '../src/services/api';

jest.mock('../src/services/api', () => ({
  fetchProductDetails: jest.fn(),
  addToCart: jest.fn()
}));

// Corrección: Simular correctamente la función useToast
jest.mock('../src/components/ui/use-toast', () => ({
  useToast: () => ({ toast: jest.fn() })
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({ id: '1' })
}));

describe('ProductDetailPage', () => {
  const mockProduct = {
    id: '1',
    brand: 'Apple',
    model: 'iPhone 12',
    price: 999,
    imgUrl: '/test.jpg',
    cpu: 'A14',
    ram: '4GB',
    options: {
      colors: [
        { code: 1, name: 'Black' },
        { code: 2, name: 'White' }
      ],
      storages: [
        { code: 1, name: '64GB' },
        { code: 2, name: '128GB' }
      ]
    }
  };
  
  beforeEach(() => {
    jest.clearAllMocks();
    api.fetchProductDetails.mockResolvedValue(mockProduct);
    api.addToCart.mockResolvedValue({ count: 1 });
  });
  
  test('should fetch and display product details', async () => {
    render(
      <ThemeProvider>
        <CartProvider>
          <BrowserRouter>
            <Routes>
              <Route path="*" element={<ProductDetailPage />} />
            </Routes>
          </BrowserRouter>
        </CartProvider>
      </ThemeProvider>
    );
    
    
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
    
    
    await waitFor(() => {
      expect(api.fetchProductDetails).toHaveBeenCalledWith('1');
      expect(screen.getByText('Apple iPhone 12')).toBeInTheDocument();
      expect(screen.getByText('$999')).toBeInTheDocument();
      expect(screen.getByText('A14')).toBeInTheDocument();
      expect(screen.getByText('4GB')).toBeInTheDocument();
    });
  });
  
  test('should select color and storage options', async () => {
    render(
      <ThemeProvider>
        <CartProvider>
          <BrowserRouter>
            <Routes>
              <Route path="*" element={<ProductDetailPage />} />
            </Routes>
          </BrowserRouter>
        </CartProvider>
      </ThemeProvider>
    );
    
    
    await waitFor(() => {
      expect(screen.getByText('Black')).toBeInTheDocument();
      expect(screen.getByText('White')).toBeInTheDocument();
      expect(screen.getByText('64GB')).toBeInTheDocument();
      expect(screen.getByText('128GB')).toBeInTheDocument();
    });
    
    
    userEvent.click(screen.getByText('White'));
    userEvent.click(screen.getByText('128GB'));
    
    
    expect(screen.getByText('White')).toHaveClass('bg-gray-900');
    expect(screen.getByText('128GB')).toHaveClass('bg-gray-900');
  });
  
  test('should add product to cart with selected options', async () => {
    render(
      <ThemeProvider>
        <CartProvider>
          <BrowserRouter>
            <Routes>
              <Route path="*" element={<ProductDetailPage />} />
            </Routes>
          </BrowserRouter>
        </CartProvider>
      </ThemeProvider>
    );
    
    
    await waitFor(() => {
      expect(screen.getByText('Add to Cart')).toBeInTheDocument();
    });
    
    
    userEvent.click(screen.getByText('White'));
    userEvent.click(screen.getByText('128GB'));
    
    
    userEvent.click(screen.getByText('Add to Cart'));
    
    
    await waitFor(() => {
      expect(api.addToCart).toHaveBeenCalledWith('1', 2, 2);
    });
  });
  
  test('should handle API errors when fetching product details', async () => {
    // Revertir el ajuste en el manejo de errores de la API
    api.fetchProductDetails.mockRejectedValueOnce(new Error('API Error'));
    
    render(
      <ThemeProvider>
        <CartProvider>
          <BrowserRouter>
            <Routes>
              <Route path="*" element={<ProductDetailPage />} />
            </Routes>
          </BrowserRouter>
        </CartProvider>
      </ThemeProvider>
    );
    
    
    await waitFor(() => {
      expect(screen.getByText(/error loading product details/i)).toBeInTheDocument();
    });
  });
});