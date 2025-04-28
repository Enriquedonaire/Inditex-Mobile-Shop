import { render, screen, act, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CartProvider, useCart } from '../src/context/CartContext';


const TestComponent = () => {
  const { cartItems, addToCart, removeFromCart, clearCart, getCartTotal } = useCart();
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
      <span data-testid="cart-count">{cartItems.length}</span>
      <span data-testid="cart-total">{getCartTotal()}</span>
      <button data-testid="add-item" onClick={() => addToCart(mockProduct, 1, 1)}>
        Add Item
      </button>
      <button data-testid="remove-item" onClick={() => removeFromCart('1-1-1')}>
        Remove Item
      </button>
      <button data-testid="clear-cart" onClick={clearCart}>
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

describe('CartContext (integration)', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  it('should add, remove and clear items in cart', async () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );
    expect(screen.getByTestId('cart-count')).toHaveTextContent('0');
    await userEvent.click(screen.getByTestId('add-item'));
    await waitFor(() => expect(screen.getByTestId('cart-count')).toHaveTextContent('1'));
    expect(screen.getByTestId('cart-total')).toHaveTextContent('999');
    expect(screen.getByTestId('cart-item')).toHaveTextContent('Apple iPhone 12');
    await userEvent.click(screen.getByTestId('remove-item'));
    await waitFor(() => expect(screen.getByTestId('cart-count')).toHaveTextContent('0'));
    await userEvent.click(screen.getByTestId('add-item'));
    await userEvent.click(screen.getByTestId('clear-cart'));
    await waitFor(() => expect(screen.getByTestId('cart-count')).toHaveTextContent('0'));
  });
});
