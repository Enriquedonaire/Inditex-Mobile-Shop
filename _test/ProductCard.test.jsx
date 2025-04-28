import { jest } from '@jest/globals';
import { render, screen, fireEvent } from '@testing-library/react';
import ProductCard from '../src/components/ProductCard';


jest.mock('../src/context/ThemeContext', () => ({
  ThemeProvider: ({ children }) => <>{children}</>,
  useTheme: () => ({ theme: 'light' })
}));

describe('ProductCard Component', () => {
  const mockProduct = {
    id: '1',
    brand: 'Apple',
    model: 'iPhone 12',
    price: 999,
    imgUrl: '/test.jpg'
  };
  
  const mockOnClick = jest.fn();
  
  beforeEach(() => {
    jest.clearAllMocks();
  });
  
  test('should render product information correctly', () => {
    render(
      <ProductCard product={mockProduct} onClick={mockOnClick} />
    );
    
    expect(screen.getByText('Apple')).toBeInTheDocument();
    expect(screen.getByText('iPhone 12')).toBeInTheDocument();
    expect(screen.getByText('$999')).toBeInTheDocument();
  });
  
  test('should call onClick when card is clicked', () => {
    render(
      <ProductCard product={mockProduct} onClick={mockOnClick} />
    );
    
    fireEvent.click(screen.getByRole('button', { name: /ver detalles/i }));
    
    expect(mockOnClick).toHaveBeenCalledTimes(1);
    expect(mockOnClick).toHaveBeenCalledWith(mockProduct);
  });
  
  test('should handle keyboard navigation', () => {
    render(
      <ProductCard product={mockProduct} onClick={mockOnClick} />
    );
    
    
    const card = screen.getByRole('article');
    card.focus();
    fireEvent.keyDown(card, { key: 'Enter', code: 'Enter' });
    
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });
  
  test('should handle missing product data gracefully', () => {
    const incompleteProduct = {
      id: '2',
      brand: 'Samsung',
      model: null,
      price: 799,
    };
    
    render(
      <ProductCard product={incompleteProduct} onClick={mockOnClick} />
    );
    
    expect(screen.getByText('Samsung')).toBeInTheDocument();
  });
});