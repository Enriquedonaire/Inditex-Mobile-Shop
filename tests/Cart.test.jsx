import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Cart from '../src/components/Cart';


jest.mock('../src/context/CartContext', () => {
  const actual = jest.requireActual('../src/context/CartContext');
  return {
    ...actual,
    useCart: () => ({
      cartItems: [{ id: 1, brand: 'Test Brand', model: 'Test Model', price: 100, quantity: 1 }],
      isCartOpen: true,
      setIsCartOpen: jest.fn(),
      removeFromCart: jest.fn(),
      updateQuantity: jest.fn(),
      clearCart: jest.fn(),
      getCartTotal: () => 100,
    })
  };
});

describe('Cart Component', () => {
  it('renders without crashing', () => {
    render(
      <MemoryRouter>
        <Cart data-testid="cart" />
      </MemoryRouter>
    );
    expect(screen.getByTestId('cart')).toBeInTheDocument();
  });
});