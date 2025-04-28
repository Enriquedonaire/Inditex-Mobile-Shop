
import { jest } from '@jest/globals';
import { render, screen, fireEvent } from '@testing-library/react';
import ProductActions from '../src/components/ProductActions';

describe('ProductActions Component', () => {
  const mockOptions = {
    colors: [
      { code: 1, name: 'Black' },
      { code: 2, name: 'White' }
    ],
    storages: [
      { code: 1, name: '64GB' },
      { code: 2, name: '128GB' }
    ]
  };

  const mockOnAddToCart = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should render color and storage options', () => {
    render(
      <ProductActions 
        options={mockOptions} 
        onAddToCart={mockOnAddToCart} 
      />
    );

    expect(screen.getByText('Black')).toBeInTheDocument();
    expect(screen.getByText('White')).toBeInTheDocument();
    expect(screen.getByText('64GB')).toBeInTheDocument();
    expect(screen.getByText('128GB')).toBeInTheDocument();
  });

  test('should call onAddToCart with selected options', () => {
    render(
      <ProductActions 
        options={mockOptions} 
        onAddToCart={mockOnAddToCart} 
      />
    );

    
    fireEvent.click(screen.getByText('White'));
    fireEvent.click(screen.getByText('128GB'));
    
    
    fireEvent.click(screen.getByText(/add to cart/i));

    
    expect(mockOnAddToCart).toHaveBeenCalledWith(2, 2);
  });

  test('should have default selections', () => {
    render(
      <ProductActions 
        options={mockOptions} 
        onAddToCart={mockOnAddToCart} 
      />
    );

    
    fireEvent.click(screen.getByText(/add to cart/i));

    
    expect(mockOnAddToCart).toHaveBeenCalledWith(1, 1);
  });
});