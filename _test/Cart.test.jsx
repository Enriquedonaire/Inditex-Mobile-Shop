import { jest } from '@jest/globals';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Cart from '../src/components/Cart';

jest.mock('../src/context/CartContext', () => {
  return {
    useCart: () => ({
      cartItems: [
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
      ],
      isCartOpen: true,
      toggleCart: jest.fn(),
      removeFromCart: jest.fn(),
      updateQuantity: jest.fn(),
      getCartTotal: jest.fn().mockReturnValue(999)
    })
  };
});

jest.mock('../src/context/ThemeContext', () => {
  return {
    useTheme: () => ({ theme: 'light' })
  };
});

describe('Cart Component', () => {
  test('should render cart with items', () => {
    render(
      <BrowserRouter>
        <Cart />
      </BrowserRouter>
    );
    
    expect(screen.getByText(/your cart/i)).toBeInTheDocument();
    expect(screen.getByText(/apple/i)).toBeInTheDocument();
    expect(screen.getByText(/iphone 12/i)).toBeInTheDocument();
    expect(screen.getByText(/black/i)).toBeInTheDocument();
    expect(screen.getByText(/64gb/i)).toBeInTheDocument();
    
    // Corrección adicional: Ajustar los selectores para evitar conflictos con elementos duplicados
    const totalElement = screen.getAllByText(/\$999/i)[0]; // Seleccionar el primer elemento coincidente
    expect(totalElement).toBeInTheDocument();
  });
  
  test('should call removeFromCart when remove button is clicked', () => {
    const { useCart } = require('../src/context/CartContext');
    const { removeFromCart } = useCart();
    
    render(
      <BrowserRouter>
        <Cart />
      </BrowserRouter>
    );
    
    const removeButton = screen.getByLabelText(/remove item/i);
    fireEvent.click(removeButton);
    
    expect(removeFromCart).toHaveBeenCalledWith('1-1-1');
  });
  
  test('should call updateQuantity when quantity is changed', () => {
    const { useCart } = require('../src/context/CartContext');
    const { updateQuantity } = useCart();
    
    render(
      <BrowserRouter>
        <Cart />
      </BrowserRouter>
    );
    
    const increaseButton = screen.getByLabelText(/increase quantity/i);
    fireEvent.click(increaseButton);
    
    expect(updateQuantity).toHaveBeenCalledWith('1-1-1', 2);
  });
  
  test('should call toggleCart when close button is clicked', () => {
    const { useCart } = require('../src/context/CartContext');
    const { toggleCart } = useCart();
    
    render(
      <BrowserRouter>
        <Cart />
      </BrowserRouter>
    );
    
    fireEvent.click(screen.getByLabelText(/close cart/i));
    
    expect(toggleCart).toHaveBeenCalled();
  });
});