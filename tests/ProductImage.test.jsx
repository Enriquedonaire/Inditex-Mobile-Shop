import { render, screen } from '@testing-library/react';
import ProductImage from '../src/components/ProductImage';

describe('ProductImage', () => {
  it('renderiza la imagen y el alt', () => {
    render(<ProductImage imageUrl="/test.jpg" alt="Test Alt" />);
    const img = screen.getByAltText('Test Alt');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', '/test.jpg');
  });

  it('renderiza el placeholder si no hay imageUrl', () => {
    render(<ProductImage />);
    expect(screen.getByAltText(/product image/i)).toHaveAttribute('src', '/placeholder.svg');
  });
});