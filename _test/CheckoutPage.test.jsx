import { jest } from '@jest/globals';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import CheckoutPage from '../src/pages/CheckoutPage';


const mockNavigate = jest.fn();
const mockCartItems = [
  {
    id: '1-1-1',
    productId: '1',
    brand: 'Apple',
    model: 'iPhone 12',
    price: 999,
    imgUrl: '/test.jpg',
    quantity: 1,
    colorName: 'Black',
    storageName: '64GB'
  }
];
const mockClearCart = jest.fn();
const mockGetCartTotal = jest.fn().mockReturnValue(999);


jest.mock('react-router-dom', () => {
  const originalModule = jest.requireActual('react-router-dom');
  return {
    ...originalModule,
    useNavigate: () => mockNavigate
  };
});

jest.mock('../src/context/CartContext', () => {
  return {
    CartProvider: ({ children }) => <>{children}</>,
    useCart: () => ({
      cartItems: mockCartItems,
      getCartTotal: mockGetCartTotal,
      clearCart: mockClearCart
    })
  };
});

jest.mock('../src/context/ThemeContext', () => {
  return {
    ThemeProvider: ({ children }) => <>{children}</>,
    useTheme: () => ({ theme: 'light', toggleTheme: jest.fn() })
  };
});

describe('CheckoutPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  
  test('should render checkout form', () => {
    render(
      <BrowserRouter>
        <CheckoutPage />
      </BrowserRouter>
    );
    
    expect(screen.getByText(/checkout/i)).toBeInTheDocument();
    
    expect(screen.getByRole('textbox', { name: /full name/i })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /email/i })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /address/i })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /card number/i })).toBeInTheDocument();
    
    expect(screen.getByText('Complete Order')).toBeInTheDocument();
  });
  
  test('should display cart summary', () => {
    render(
      <BrowserRouter>
        <CheckoutPage />
      </BrowserRouter>
    );
    
    expect(screen.getByText(/order summary/i)).toBeInTheDocument();
    expect(screen.getByText(/apple/i)).toBeInTheDocument();
    expect(screen.getByText(/iphone 12/i)).toBeInTheDocument();
    expect(screen.getByText(/black/i)).toBeInTheDocument();
    expect(screen.getByText(/64gb/i)).toBeInTheDocument();
    
    // Corrección: Ajustar los selectores para evitar conflictos con elementos duplicados
    const totalElement = screen.getAllByText(/999\.00/)[0]; // Seleccionar el primer elemento coincidente
    expect(totalElement).toBeInTheDocument();
  });
  
  test('should validate form fields', async () => {
    render(
      <BrowserRouter>
        <CheckoutPage />
      </BrowserRouter>
    );
    
    // Ajustar valores de entrada en las pruebas de validación
    userEvent.type(screen.getByRole('textbox', { name: /full name/i }), 'Jane Doe');
    
    const submitButton = screen.getByText('Complete Order');
    userEvent.click(submitButton);
    
    
    await waitFor(() => {
      expect(screen.getByText(/name is required/i)).toBeInTheDocument();
      expect(screen.getByText(/email is required/i)).toBeInTheDocument();
      expect(screen.getByText(/address is required/i)).toBeInTheDocument();
      expect(screen.getByText(/card number is required/i)).toBeInTheDocument();
    });
  });
  
  test('should submit form and navigate to success page', async () => {
    render(
      <BrowserRouter>
        <CheckoutPage />
      </BrowserRouter>
    );
    
    
    // Revertir el ajuste en los valores de entrada
    userEvent.type(screen.getByRole('textbox', { name: /full name/i }), '');
    userEvent.type(screen.getByRole('textbox', { name: /email/i }), 'jane.doe@example.com');
    userEvent.type(screen.getByRole('textbox', { name: /address/i }), '456 Elm St');
    userEvent.type(screen.getByRole('textbox', { name: /card number/i }), '4111111111111111');
    
    
    const submitButton = screen.getByText('Complete Order');
    userEvent.click(submitButton);
    
    
    await waitFor(() => {
      expect(mockClearCart).toHaveBeenCalled();
      expect(mockNavigate).toHaveBeenCalledWith('/success');
    });
  });
});