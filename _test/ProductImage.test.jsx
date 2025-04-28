import { render, screen } from '@testing-library/react';
import ProductImage from '../src/components/ProductImage';

describe('ProductImage', () => {
  it('renders with image and alt', () => {
    render(<ProductImage imageUrl="/test.jpg" alt="Test Alt" />);
    const img = screen.getByAltText('Test Alt');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', '/test.jpg');
  });

  it('renders placeholder if no imageUrl', () => {
    render(<ProductImage />);
    expect(screen.getByAltText(/product image/i)).toHaveAttribute('src', '/placeholder.svg');
  });
});