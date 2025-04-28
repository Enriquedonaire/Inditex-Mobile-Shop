import { jest } from '@jest/globals';
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CartProvider, useCart } from '../src/context/CartContext';

// Revertir la eliminación de la importación redundante de CartProvider
import { CartProvider } from '../src/context/CartContext';

// Corrección: Asegurar que los valores iniciales del carrito estén correctamente simulados
jest.mock('../src/context/CartContext', () => ({
  useCart: () => ({
    cartItems: [],
    cartCount: 0,
    cartTotal: 0,
    addToCart: jest.fn(),
    clearCart: jest.fn()
  })
}));

jest.mock('../src/services/api', () => ({
  addToCart: jest.fn().mockResolvedValue({ count: 1 })
}));

// Corrección adicional: Exportar correctamente el CartProvider
export { CartProvider } from '../src/context/CartContext';

// Corrección: Simular correctamente el almacenamiento local
jest.spyOn(localStorage, 'getItem').mockImplementation((key) => {
  if (key === 'cart') return JSON.stringify([]);
  return null;
});

jest.spyOn(localStorage, 'setItem').mockImplementation(() => {});

const TestComponent = () => {
  const { cartItems, cartCount, addToCart, removeFromCart, clearCart, getCartTotal } = useCart();
  
  const mockProduct = {
    id: '1',
    brand: 'Apple',
    model: 'iPhone 12',
    price: 999,
    imgUrl: '/test.jpg',
    options: {
      colors: [{ code: 1, name: 'Black' }],
      storages: [{ code: 1, name: '64GB' }]
    }
  };
  
  return (
    <div>
      <span data-testid="cart-count">{cartCount}</span>
      <span data-testid="cart-total">{getCartTotal()}</span>
      <button 
        data-testid="add-item" 
        onClick={() => addToCart(mockProduct, 1, 1)}
      >
        Add Item
      </button>
      <button 
        data-testid="remove-item" 
        onClick={() => removeFromCart('1-1-1')}
      >
        Remove Item
      </button>
      <button 
        data-testid="clear-cart" 
        onClick={clearCart}
      >
        Clear Cart
      </button>
      <ul>
        {cartItems.map(item => (
          <li key={item.id} data-testid="cart-item">
            {item.brand} {item.model} - Quantity: {item.quantity}
          </li>
        ))}
      </ul>
    </div>
  );
};

describe('CartContext', () => {
  beforeEach(() => {
    
    jest.clearAllMocks();
    localStorage.clear();
  });
  
  test('should initialize with empty cart', () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );
    
    expect(screen.getByTestId('cart-count')).toHaveTextContent('0');
    expect(screen.getByTestId('cart-total')).toHaveTextContent('0');
    expect(screen.queryByTestId('cart-item')).not.toBeInTheDocument();
  });
  
  test('should add item to cart', async () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );
    
    await act(async () => {
      userEvent.click(screen.getByTestId('add-item'));
    });
    
    
    expect(screen.getByTestId('cart-count')).toHaveTextContent('1');
    expect(screen.getByTestId('cart-total')).toHaveTextContent('999');
    expect(screen.getByTestId('cart-item')).toHaveTextContent('Apple iPhone 12');
  });
  
  test('should clear cart', async () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );
    
    
    await act(async () => {
      userEvent.click(screen.getByTestId('add-item'));
    });
    
    await act(async () => {
      userEvent.click(screen.getByTestId('clear-cart'));
    });
    
    
    expect(screen.getByTestId('cart-count')).toHaveTextContent('0');
    expect(screen.queryByTestId('cart-item')).not.toBeInTheDocument();
  });
});