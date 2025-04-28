import { render, screen } from '@testing-library/react';
import ProductCard from '../src/components/ProductCard';

describe('ProductCard Component', () => {
  it('renders without crashing', () => {
    render(<ProductCard product={{ title: 'Test Product', brand: 'Test Brand', price: 100 }} />);
    expect(screen.getByText('Test Product')).toBeInTheDocument();
  });
});